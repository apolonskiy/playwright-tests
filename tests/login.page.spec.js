import {test, expect} from "@playwright/test";
import {LoginPage} from "../models/index.js";
import {baseUrl} from "../test.constants.js";
import {waitForMultiPage} from "../utils/multi.page.waiter.js";

let loginPage;
test.describe("Login page test", () => {
  test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    await page.goto(loginPage.pageDomain);
  });

  test("Username input error verification", async () => {
    // initial page check
    await expect(await loginPage.waitForPageToLoad()).toBeTruthy();
    await expect(
      await loginPage.isUsernameErrorTextVisible(1000)
    ).not.toBeTruthy();
    await loginPage.clickSignInButton();
    await expect(await loginPage.getUsernameErrorText()).toEqual(
      "Please enter an email address or phone number"
    );
    // assert invalid username
    await loginPage.typeUsername("abc");
    await loginPage.clickSignInButton();
    await expect(await loginPage.getUsernameErrorText()).toEqual(
      "Please enter a valid username"
    );
    await loginPage.typeUsername("abc@ln.com");
    await loginPage.clickSignInButton();
    // assert valid username inputted
    await expect(await loginPage.isUsernameErrorTextVisible()).not.toBeTruthy();
  });

  test("Password input error verification", async () => {
    // initial page check
    await expect(await loginPage.waitForPageToLoad()).toBeTruthy();
    await expect(
      await loginPage.isPasswordErrorTextVisible(1000)
    ).not.toBeTruthy();
    await loginPage.clickSignInButton();
    await expect(
      await loginPage.isPasswordErrorTextVisible(1000)
    ).not.toBeTruthy();
    // verify empty password error
    await loginPage.typeUsername("abc@ln.com");
    await loginPage.clickSignInButton();
    await expect(await loginPage.isPasswordErrorTextVisible()).toBeTruthy();
    await expect(await loginPage.getPasswordErrorText()).toEqual(
      "Please enter a password."
    );
    // verify short password error
    await loginPage.typePassword("abv");
    await loginPage.clickSignInButton();
    await expect(await loginPage.isPasswordErrorTextVisible()).toBeTruthy();
    await expect(await loginPage.getPasswordErrorText()).toEqual(
      "The password you provided must have at least 6 characters."
    );
    // verify visibility toggle
    await expect(await loginPage.getPasswordInputType()).toEqual("password");
    await loginPage.clickVisibilityToggle();
    await expect(await loginPage.getPasswordInputType()).toEqual("text");
  });

  // TODO: policy links check;
  test("Links verification", async () => {
    // Page header link check
    await expect(await loginPage.waitForPageToLoad()).toBeTruthy();
    await loginPage.clickPageHeader();
    await expect(loginPage.page.url()).toEqual(baseUrl);
    // Forgot password link check
    await loginPage.page.goto(loginPage.pageDomain);
    await loginPage.clickForgotLink();
    await expect(loginPage.page.url()).toEqual(
      `${baseUrl}checkpoint/rp/request-password-reset`
    );
    // Join Now link check
    await loginPage.page.goBack();
    await loginPage.clickJoinNowLink();
    await expect(loginPage.page.url()).toEqual(`${baseUrl}signup/cold-join`);
  });

  test("Google sign in verification", async ({context}) => {
    // Page header link check
    await expect(await loginPage.waitForPageToLoad()).toBeTruthy();
    await expect(await loginPage.isGoogleSignInButtonVisible()).toBeTruthy();
    await loginPage.clickGoogleSsoButton();
    await waitForMultiPage(context);
    await expect(context.pages().length).toEqual(2);
    // TODO: With valid SSO creds assert actual sign in capabilities;
  });

  // TODO: Having available user creds, test valid login;
  // In case this would have been a fully-controlled system, add API user creation as pre-condition;
});
