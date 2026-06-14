import { test, expect } from '@playwright/test';
import HomePage from '../../POM/home.page.js';

test.describe('Homepage Smoke Tests', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

test('Homepage loads with all key elements',{ tag: '@smoke' }, async () => {
  // property names from  Page Object class
  await expect(homePage.searchInput).toBeVisible();
  await expect(homePage.locationInput).toBeVisible();
  await expect(homePage.searchButton).toBeVisible();
  await expect(homePage.postJobButton).toBeVisible();
  await expect(homePage.loginLink).toBeVisible();
  await expect(homePage.signupLink).toBeVisible();
});


  test('Click Browse Jobs navigates to job list',{ tag: '@smoke' }, async () => {
    await homePage.goToBrowseJobs();
      console.log(await homePage.page.url());

    await expect(homePage.page).toHaveURL(/latest-jobs/);
  });

  test('Click Post a Job redirects to post a job',{ tag: '@smoke' }, async () => {
    await homePage.goToPostJob();
    await expect(homePage.page).toHaveURL(/create/);
  });
});