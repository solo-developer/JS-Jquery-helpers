function unauthorisedFetchMiddleware(...fetchParams, loginUrlPart, sessionTimeoutFunction) {
    return new Promise(async function (resolveThis, rejectThis) {
        var data = fetch(...fetchParams);
        var response = await data;
      
        if (response.url.toLowerCase().includes(loginUrlPart.toLowerCase())) {
            rejectThis(new SessionTimeoutError("Session Timeout Occured"));

            sessionTimeoutFunction();
        }
        else {
            resolveThis(response);
        }

    });
}

async function handleFetchError(exception, normalExceptionHandlingFunction) {
    if (exception instanceof SessionTimeoutError) {
        return;
    }

    normalExceptionHandlingFunction();
}

class SessionTimeoutError extends Error {
    constructor(message) {
        super(message);
        this.name = "SessionTimeoutError";
    }
}
