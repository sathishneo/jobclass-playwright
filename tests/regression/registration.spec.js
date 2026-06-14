import { test, expect } from '@playwright/test';
import HomePage from '../../POM/home.page.js';
import SignupPage from '../../POM/signup.page.js';
import users from '../../testData/users.json' assert { type: 'json' };

test.describe('Registration Regression Tests', () => {
  let homePage, signupPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signupPage = new SignupPage(page);
    await homePage.navigate();
    await homePage.goToSignup();
  });

  test('User can register with valid details', async () => {
    await signupPage.fillSignupForm(users.jobSeeker);
    await signupPage.submit();
    await expect(signupPage.page).toHaveURL(/login/);
  });

  test('User cannot register with invalid email', async () => {
    const invalidUser = { ...users.jobSeeker, email: 'invalid-email' };
    await signupPage.fillSignupForm(invalidUser);
    await signupPage.submit();
    const errorMessage = await signupPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid email');
  });

  test('User cannot register with empty fields', async () => {
    const emptyUser = { name: '', email: '', password: '', phone: '', userType: 'Job seeker' };
    await signupPage.fillSignupForm(emptyUser);
    await signupPage.submit();
    const errorMessage = await signupPage.getErrorMessage();
    expect(errorMessage).toContain('required');
  });
});