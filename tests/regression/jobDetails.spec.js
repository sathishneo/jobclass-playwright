import { test, expect } from '@playwright/test';
import HomePage from '../../POM/home.page.js';
import JobListPage from '../../POM/jobList.page.js';
import JobDetailPage from '../../POM/jobDetail.page.js';

test.describe('Job Details Regression Tests', () => {
  let homePage, jobListPage, jobDetailPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    jobListPage = new JobListPage(page);
    jobDetailPage = new JobDetailPage(page);
    await homePage.navigate();
    await homePage.searchJob('Software');
  });

  test('User can view job details', async () => {
    await jobListPage.openJob(0);
    const jobTitle = await jobDetailPage.getJobTitle();
    expect(jobTitle).toBeTruthy();
  });

  test('Job details page shows all required fields', async () => {
    await jobListPage.openJob(0);
    await expect(jobDetailPage.page.locator(jobDetailPage.jobTitle)).toBeVisible();
    await expect(jobDetailPage.page.locator(jobDetailPage.jobDescription)).toBeVisible();
    await expect(jobDetailPage.page.locator(jobDetailPage.companyInfo)).toBeVisible();
  });

  test('User can navigate back to job list', async () => {
    await jobListPage.openJob(0);
    await jobDetailPage.page.goBack();
    const jobCount = await jobListPage.getJobCount();
    expect(jobCount).toBeGreaterThan(0);
  });
});