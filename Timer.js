class Timer {
    constructor() {
        this.isRunning = false;
        this.startTime = 0;
        this.overallTime = 0;
    }

    _getTimeElapsedSinceLastStart() {
        if (!this.startTime) {
            return 0;
        }

        return Date.now() - this.startTime;
    }

    start() {
        if (this.isRunning) {
            return console.error('Timer is already running');
        }

        this.isRunning = true;

        this.startTime = Date.now();
    }

    stop() {
        if (!this.isRunning) {
            return console.error('Timer is already stopped');
        }

        this.isRunning = false;

        this.overallTime = this.overallTime + this._getTimeElapsedSinceLastStart();
    }

    reset() {
        this.overallTime = 0;

        if (this.isRunning) {
            this.startTime = Date.now();
            return;
        }

        this.startTime = 0;
    }

    getTime() {
        if (!this.startTime) {
            return 0;
        }

        if (this.isRunning) {
            return this.overallTime + this._getTimeElapsedSinceLastStart();
        }

        return this.overallTime;
    }

    function formatTime(timeInSeconds) {
        if (timeInSeconds < 60) {
            return getTimeFormattedForSecs(timeInSeconds);
        } else if (timeInSeconds < 60 * 60) {
            return getTimeFormattedForMinutes(timeInSeconds);
        } else if (timeInSeconds < 60 * 60 * 60) {

        }
    }

    function getTimeFormattedForSecs(secs) {
        return `${secs} secs`;
    }

    function getTimeFormattedForMinutes(timeInSeconds) {
        let minutes = Math.floor(timeInSeconds / 60);
        let seconds = (timeInSeconds - (minutes * 60));
        return `${minutes} mins ${getTimeFormattedForSecs(seconds)}`;
    }

    function getTimeFormattedForHours(timeInSeconds) {
        let hours = Math.floor(timeInSeconds / (60 * 60));
        let remainingSeconds = timeInSeconds - (hours * 60);
        return `${hours} hrs ${getTimeFormattedForMinutes(remainingSeconds)}`;
    }

}
