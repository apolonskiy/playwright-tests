import {GenericPage} from "./generic.page";
import {defaultWaitTime} from "../test.constants";
export class LoginPage extends GenericPage {
  pageDomain = "/login";

  constructor(page) {
    super(page);
    this.pageLogo = this.page.locator('[class="linkedin-logo"]');
    this.usernameInput = this.page.locator(
      '[class="card-layout"] input[id="username"]'
    );
    this.usernameInputError = this.page.locator('[id="error-for-username"]');
    this.passwordInput = this.page.locator(
      '[class="card-layout"] input[id="password"]'
    );
    this.passwordInputError = this.page.locator('[id="error-for-password"]');
    this.passwordVisibilityToggle = this.page.locator(
      '[id="password-visibility-toggle"]'
    );
    this.forgotPasswordLink = this.page.locator(
      '[class="card-layout"] a[href="/checkpoint/rp/request-password-reset"]'
    );
    this.signInButton = this.page.locator('button[type="submit"]');
    this.googleSsoButton = this.page
      .frameLocator('[class="alternate-signin-container"] div iframe')
      .locator("//div[@id='container' and //*[name()='svg']]");
    this.appleSignInButton = this.page.locator(
      '[class="sign-in-with-apple-button"]'
    );
    this.joinNowLink = this.page.locator(
      '[class="join-now"] a[href="/signup/cold-join"]'
    );
  }

  async waitForPageToLoad(waitTime = defaultWaitTime) {
    const loadingRes = await Promise.all([
      this.waitUtils.waitForElementToBeVisible(this.pageLogo, waitTime),
      this.waitUtils.waitForElementToBeVisible(this.usernameInput, waitTime),
      this.waitUtils.waitForElementToBeVisible(this.passwordInput, waitTime)
    ]);
    return loadingRes.every(res => !!res);
  }

  async clickPageHeader() {
    await this.pageLogo.click();
  }

  async typeUsername(username) {
    await this.usernameInput.clear();
    await this.usernameInput.fill(username);
  }

  async getUsernameErrorText() {
    await this.waitUtils.waitForElementToBeVisible(this.usernameInputError);
    return this.usernameInputError.textContent();
  }

  async isUsernameErrorTextVisible(waitTime = defaultWaitTime) {
    return this.waitUtils.waitForElementToBeVisible(
      this.usernameInputError,
      waitTime
    );
  }
  async typePassword(password) {
    await this.passwordInput.clear();
    await this.passwordInput.fill(password);
  }

  async getPasswordInputType() {
    return this.passwordInput.getAttribute("type");
  }
  async getPasswordErrorText() {
    await this.waitUtils.waitForElementToBeVisible(this.passwordInputError);
    return this.passwordInputError.textContent();
  }

  async isPasswordErrorTextVisible(waitTime = defaultWaitTime) {
    return this.waitUtils.waitForElementToBeVisible(
      this.passwordInputError,
      waitTime
    );
  }
  async clickSignInButton() {
    await this.signInButton.click();
  }

  async isForgotLinkVisible() {
    return this.waitUtils.waitForElementToBeVisible(this.forgotPasswordLink);
  }

  async clickForgotLink() {
    await this.isForgotLinkVisible();
    await this.forgotPasswordLink.click();
  }

  async isJoinNowLinkVisible() {
    return this.waitUtils.waitForElementToBeVisible(this.joinNowLink);
  }

  async clickJoinNowLink() {
    await this.joinNowLink.click();
  }

  async isGoogleSignInButtonVisible() {
    return this.waitUtils.waitForElementToBeVisible(this.googleSsoButton);
  }

  async clickGoogleSsoButton() {
    // Safari has issues with clicking without force;
    /* eslint-disable-next-line playwright/no-force-option */
    await this.googleSsoButton.click({force: true});
  }
  async clickVisibilityToggle() {
    await this.passwordVisibilityToggle.click();
  }
}
