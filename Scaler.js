/**
 * 
 * @param {any} selector - parent elements whose all elements are scaled by proportion
 * @param {any} proportion - ratio at which elements are scaled
 */
function scale(selector, proportion) {

    $(selector).find('*').each(function () {
        let currentElement = $(this);
        let propertiesToProportion = ['margin', 'padding', 'font-size', 'line-height', 'height'];
        if (currentElement.is('div')) {
            propertiesToProportion.pop();
        }

        resizeElementProportionally(proportion, currentElement, ...propertiesToProportion);
    });
}
/**
 * 
 * @param {any} selector -  parent elements whose elements are scaled by proportion
 * @param {any} proportion - ratio at which elements are scaled
 * @param {...any} elementTypes - element tags that are to be scaled like p,div,....
 */
function scaleElements(selector, proportion, ...elementTypes) {
    $(selector).find('*').each(function () {
        let currentElement = $(this);
        if (currentElement.is(elementTypes.join(','))) {
            resizeElementProportionally(proportion, currentElement, 'margin', 'padding', 'font-size', 'line-height', 'height');
        }
    });
}

/**
 * 
 * this function adds attributes to element dynamically and stores changed values in session storage. If not saved in session storage,height of nodes inside table are not shown accurate. So, to sort out the issue values are manipulated through session storage
 */
function resizeElementProportionally(proportion, element, ...attributes) {
    for (let i = 0; i < attributes.length; i++) {
        let attribute = attributes[i];
        let uniqueDataIdKey = "data-sessionId";
        let selectorUniqueID = element.attr(uniqueDataIdKey);
        if (selectorUniqueID == undefined) {
            let uniqueVal = "comparable-" + randomIntFromInterval(1, 999999999999);
            element.attr(uniqueDataIdKey, uniqueVal);
            selectorUniqueID = uniqueVal;
        }

        let valueFromSession = getNodeProportionalValueFromSessionStorage(selectorUniqueID, attribute);
        let attributeValue = valueFromSession ?? element.css(attribute);

        if (attribute === 'height' && element.is('p')) {
            element.css(attribute, 'auto');
            continue;
        }
        if (attributeValue.indexOf('px') != -1) {
            let valueInPx = (+(attributeValue.replace(/\px/g, '').trim())).toFixed(0);
            if (isNaN(valueInPx) || valueInPx == 0) {
                continue;
            }
            let minValueOfAttr = element.attr(`min-${attribute}`);
            if (minValueOfAttr && (+(minValueOfAttr.replace(/\px/g, '').trim())).toFixed(0) > valueInPx) {
                element.css(attribute, minValueOfAttr + 'px');
                return;
            }
            let actualPxToBe = valueInPx * proportion;
            element.css(attribute, actualPxToBe + 'px');
            setNodeProportionalValueToSessionStorage(selectorUniqueID, attribute, actualPxToBe + "px");
        }
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getNodeProportionalValueFromSessionStorage(selector_id, attribute) {
    if (sessionStorage.getItem(selector_id) === null) {
        return null;
    }
    let storedData = JSON.parse(sessionStorage.getItem(selector_id));
    let attributeDetail = storedData.find(a => a.attribute === attribute);
    if (attributeDetail) {
        return attributeDetail.value;
    }
}

function setNodeProportionalValueToSessionStorage(selector_id, attribute, value) {
    let data = {
        attribute,
        value
    }

    let storedSelectorData = sessionStorage.getItem(selector_id);
    if (storedSelectorData == null) {
        sessionStorage.setItem(selector_id, JSON.stringify([data]));
        return;
    }
    let storedArray = JSON.parse(storedSelectorData);

    let index = storedArray.findIndex((obj => obj.attribute == attribute));
    if (index == -1) {
        storedArray.push(data);
    }
    else {
        storedArray[index] = data;
    }
    sessionStorage.removeItem(selector_id);
    sessionStorage.setItem(selector_id, JSON.stringify(storedArray));
}
