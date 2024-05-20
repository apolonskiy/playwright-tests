import {deepEqual} from "assert";
import {Timer} from "./timer.utils";
import {defaultWaitTime} from "../../test.constants.js";

export class WaitUtils {
  waitIntervalMS = 200;
  defaultTimeoutMS = defaultWaitTime;
  #deepComparison = (obj1, obj2) => {
    let result = true;

    try {
      deepEqual(obj1, obj2);
    } catch (err) {
      result = false;
    }

    return result;
  };

  /**
   * Sleep program execution for the specified amount of milliseconds
   * @param waitTimeMS
   */
  sleep = async waitTimeMS => {
    if (waitTimeMS <= 0) {
      return;
    }

    await new Promise(resolve => {
      setTimeout(resolve, waitTimeMS);
    });
  };

  waitForElementToBeVisible = async (elem, timeout = this.defaultTimeoutMS) => {
    const timer = new Timer();
    let result = await elem.isVisible();
    let success = this.#deepComparison(result, true);
    while (!success && timer.getTimeSinceStartMS() < timeout) {
      await this.sleep(this.waitIntervalMS);
      result = await elem.isVisible();
      success = this.#deepComparison(result, true);
    }
    timer.stopTimer();
    return success;
  };

  waitForElementToNotExist = async (elem, timeout = this.defaultTimeoutMS) => {
    const timer = new Timer();
    let result = await elem.isVisible();
    let success = this.#deepComparison(result, false);
    while (!success && timer.getTimeSinceStartMS() < timeout) {
      await this.sleep(this.waitIntervalMS);
      result = await elem.isVisible();
      success = this.#deepComparison(result, false);
    }
    timer.stopTimer();
    return success;
  };

  waitForElementToBeHidden = async (elem, timeout = this.defaultTimeoutMS) => {
    const timer = new Timer();
    let result = await elem.isHidden();
    let success = this.#deepComparison(result, true);
    while (!success && timer.getTimeSinceStartMS() < timeout) {
      await this.sleep(this.waitIntervalMS);
      result = await elem.isHidden();
      success = this.#deepComparison(result, true);
    }
    timer.stopTimer();
    return success;
  };

  waitForElementToBeEnabled = async (elem, timeout = this.defaultTimeoutMS) => {
    const timer = new Timer();
    let result = await elem.isEnabled();
    let success = this.#deepComparison(result, true);
    while (!success && timer.getTimeSinceStartMS() < timeout) {
      await this.sleep(this.waitIntervalMS);
      result = await elem.isEnabled();
      success = this.#deepComparison(result, true);
    }
    timer.stopTimer();
    return success;
  };

  waitForElementToBeDisabled = async (
    elem,
    timeout = this.defaultTimeoutMS
  ) => {
    const timer = new Timer();
    let result = await elem.isDisabled();
    let success = this.#deepComparison(result, true);
    while (!success && timer.getTimeSinceStartMS() < timeout) {
      await this.sleep(this.waitIntervalMS);
      result = await elem.isDisabled();
      success = this.#deepComparison(result, true);
    }
    timer.stopTimer();
    return success;
  };
}
