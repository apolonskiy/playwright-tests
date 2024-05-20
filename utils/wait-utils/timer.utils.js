/**
 * Simple class to handle tracking the elapsed time between actions
 */
export class Timer {
  startTime;

  endTime;

  elapsedTimeMS;

  constructor() {
    this.startTimer();
  }

  /**
   * Get the amount of time in milliseconds since the timer started
   * If the timer has stopped, it will return the recorded elapsed time
   * @returns number - Elapsed time since timer was started.
   * If timer has stopped, the recorded elapsed time will be returned.
   */
  getTimeSinceStartMS() {
    if (this.elapsedTimeMS) {
      return this.elapsedTimeMS;
    }
    if (!this.startTime) {
      throw new Error("Cannot check elapsed time because it has no start time");
    }
    return new Date().getTime() - this.startTime.getTime();
  }

  /**
   * Start timer
   * Clear out endTime and elapsedTimeMS
   */
  startTimer() {
    this.startTime = new Date();
    this.endTime = undefined;
    this.elapsedTimeMS = undefined;
  }

  /**
   * Stop timer and return elapsed time in MS
   * @returns number - elapsed time in milliseconds
   */
  stopTimer() {
    if (!this.startTime) {
      throw new Error("Cannot stop timer because it has no start time");
    }
    this.endTime = new Date();
    this.elapsedTimeMS = this.endTime.getTime() - this.startTime.getTime();
    return this.elapsedTimeMS;
  }
}
