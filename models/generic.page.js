import {WaitUtils} from "../utils/wait-utils/wait.utils";

export class GenericPage {
  constructor(page) {
    this.page = page;
  }

  waitUtils = new WaitUtils();
}
