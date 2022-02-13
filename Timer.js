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

    formatTime(timeInSeconds) {
        if (timeInSeconds < 60) {
            return this.getTimeFormattedForSecs(timeInSeconds);
        }

        else if (timeInSeconds < 60 * 60) {
            return this.getTimeFormattedForMinutes(timeInSeconds);
        }

        else if (timeInSeconds < 60 * 60 * 60) {
            this.getTimeFormattedForHours(timeInSeconds);
        }
    }

    getTimeFormattedForSecs(secs) {
        return `${secs} secs`;
    }

    getTimeFormattedForMinutes(timeInSeconds) {
        let minutes = Math.floor(timeInSeconds / 60);
        let seconds = (timeInSeconds - (minutes * 60));
        return `${minutes} mins ${this.getTimeFormattedForSecs(seconds)}`;
    }

    getTimeFormattedForHours(timeInSeconds) {
        let hours = Math.floor(timeInSeconds / (60 * 60));
        let remainingSeconds = timeInSeconds - (hours * 60);
        return `${hours} hrs ${this.getTimeFormattedForMinutes(remainingSeconds)}`;
    }
}

export default Timer;
