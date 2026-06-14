import { test, expect } from '@playwright/test';
import HomePage from '../../POM/home.page.js';
import LoginPage from '../../POM/login.page.js';
import users from '../../testData/users.json' assert { type: 'json' };

test.describe('Login Smoke Tests', () => {
  let homePage, loginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    await homePage.navigate();
    await homePage.goToLogin();
  });

  test('Login page loads successfully',{ tag: '@smoke' }, async () => {
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('Login with valid credentials redirects to account page',{ tag: '@smoke' }, async () => {
    await loginPage.fillLoginForm(users.jobSeeker.email, users.jobSeeker.password);
    await loginPage.submit();
    await expect(loginPage.page).toHaveURL(/account/);
  });

  test('Login with invalid credentials shows error',{ tag: '@smoke' }, async () => {
    await loginPage.fillLoginForm(users.invalidUser.email, users.invalidUser.password);
    await loginPage.submit();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(errorMessage);
  });
});