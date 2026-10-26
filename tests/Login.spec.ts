import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/HomePage';
import { LoginPage } from '../Pages/LoginPage';
import { VALID_USER } from '../Data/Data';

test("Login with Valid Credentials", async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    
    // Goto 'Home' page and click 'Log in' link button
    await homePage.goto();
    await homePage.clickLogin();

    // Login with valid username and password
    await loginPage.loginUser(VALID_USER.email, VALID_USER.password);

    // Check the home page menu, first link is user email and second link is 'Log out' or not
    await expect(homePage.accountLink).toBeVisible();
    await expect(homePage.accountLink).toHaveText(VALID_USER.email);
    await expect(homePage.logoutLink).toBeVisible();
    await expect(homePage.logoutLink).toHaveText("Log out");
});

test("Login with Invalid Credentials", async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    // Goto 'Home' page and click 'Log in' link button
    await homePage.goto();
    await homePage.clickLogin();

    // Login with wrong password
    await loginPage.loginUser(VALID_USER.email, 'wrong');

    // Check the error message
    await expect(loginPage.errorMessage).toContainText('Login was unsuccessful. Please correct the errors and try again.');
    await expect(loginPage.errorMessage).toContainText('The credentials provided are incorrect');

    // Login with non-register email
    await loginPage.loginUser('invalid.email@yopmail.com', VALID_USER.password);

    // Check the error message
    await expect(loginPage.errorMessage).toContainText('Login was unsuccessful. Please correct the errors and try again.');
    await expect(loginPage.errorMessage).toContainText('No customer account found');
});