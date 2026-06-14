import { test, expect } from '@playwright/test';
import HomePage from '../../POM/home.page.js';
import JobListPage from '../../POM/jobList.page.js';
import searchData from '../../testData/searchData.json' assert { type: 'json' };

test.describe('Search Smoke Tests', () => {
  let homePage, jobListPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    jobListPage = new JobListPage(page);
    await homePage.navigate();
  });

  test.skip('Search by keyword displays results', async () => {
    await homePage.searchJob(searchData.validSearch.keyword);
    const jobCount = await jobListPage.getJobCount();
    expect(jobCount).toBeGreaterThan(0);
  });

  test.skip('Search by location displays results', async () => {
    await homePage.searchJob('', searchData.validSearch.location);
    const jobCount = await jobListPage.getJobCount();
    expect(jobCount).toBeGreaterThan(0);
  });

  test.skip('Search with empty fields shows no results', async () => {
    await homePage.searchJob(searchData.invalidSearch.keyword, searchData.invalidSearch.location);
    await expect(jobListPage.page.locator('.no-results')).toBeVisible();
  });
});