import { test, expect } from '@playwright/test';
import HomePage from '../../POM/home.page.js';

test.describe('Post Job Redirect Smoke Tests', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('Click Post a Job redirects to post a job',{ tag: '@smoke' }, async () => {
    await homePage.goToPostJob();
    await expect(homePage.page).toHaveURL(/create/);
  });

  test('Post Job button is visible on homepage',{ tag: '@smoke' }, async () => {
    await expect(homePage.postJobButton).toBeVisible();
  });

  test('Redirect to login shows prompt message',{ tag: '@smoke' }, async () => {
    await homePage.goToPostJob();
    await expect(homePage.postAJob).toBeVisible();
  });
});