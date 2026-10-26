import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/HomePage';
import { RegisterPage } from '../Pages/RegisterPage';
import { VALID_USER } from '../Data/Data';

test("Register Existing User", async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);

  // Goto 'Home' page and click 'Register' link button
  await homePage.goto();
  await homePage.clickRegister();

  // Fill the register form with existing user information
  await registerPage.registerUser(VALID_USER.gender, VALID_USER.firstName, VALID_USER.lastName, VALID_USER.email, VALID_USER.password);

  // Check the error messgae is visible and show as 'The specified email already exists' or not
  await expect(registerPage.errorMessage).toBeVisible();
  await expect(registerPage.errorMessage).toHaveText("The specified email already exists")
});

test("Register New User", async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);

  // Goto 'Home' page and click 'Register' link button
  await homePage.goto();
  await homePage.clickRegister();

  // Create a unique email address with current datetime
  const uniqueEmail = `james.moe_${Date.now()}@yopmail.com`;

  // Fill the user form with unique email
  await registerPage.registerUser(VALID_USER.gender, VALID_USER.firstName, VALID_USER.lastName, uniqueEmail, VALID_USER.password);

  // Check the registration complete message is visible and show as 'Your registration completed' or not
  await expect(registerPage.resultMessage).toBeVisible();
  await expect(registerPage.resultMessage).toHaveText('Your registration completed');

  // Click the 'Continue' button from registration complete form
  await registerPage.clickContinue();

  // Check the home page menu, first link is unique email and second link is 'Log out' or not
  await expect(homePage.accountLink).toBeVisible();
  await expect(homePage.accountLink).toHaveText(uniqueEmail);
  await expect(homePage.logoutLink).toBeVisible();
  await expect(homePage.logoutLink).toHaveText("Log out");

  // Click 'Log out' button
  await homePage.clickLogout();

  // Check the home page menu, first link is 'Register' and second link is 'Log in' or not
  await expect(homePage.registerLink).toBeVisible();
  await expect(homePage.registerLink).toHaveText("Register");
  await expect(homePage.loginLink).toBeVisible();
  await expect(homePage.loginLink).toHaveText("Log in");
});