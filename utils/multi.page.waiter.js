import {WaitUtils} from "./wait-utils/wait.utils.js";

export const waitForMultiPage = async (
  context,
  waitTime = 1000,
  maxCounter = 10
) => {
  const waitUtils = new WaitUtils();
  let pages = context.pages();
  let counter = 0;
  while (pages.length === 1 && counter < maxCounter) {
    await waitUtils.sleep(waitTime);
    pages = context.pages();
    counter++;
  }
};
