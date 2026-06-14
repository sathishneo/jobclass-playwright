import { test, expect } from '@playwright/test';
import HomePage from '../../POM/home.page.js';
import LoginPage from '../../POM/login.page.js';
import JobListPage from '../../POM/jobList.page.js';
import JobDetailPage from '../../POM/jobDetail.page.js';
import users from '../../testData/users.json' assert { type: 'json' };

test.describe('Apply Regression Tests', () => {
  let homePage, loginPage, jobListPage, jobDetailPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    jobListPage = new JobListPage(page);
    jobDetailPage = new JobDetailPage(page);
    
    await homePage.navigate();
    await homePage.goToLogin();
    await loginPage.fillLoginForm(users.jobSeeker.email, users.jobSeeker.password);
    await loginPage.submit();
  });

  test.only('User can apply for a job', async () => {
    await homePage.searchJob('Software');
    await jobListPage.openJob(0);
    await jobDetailPage.applyForJob();
    const confirmation = await jobDetailPage.getConfirmationMessage();
    expect(confirmation).toContain('Application submitted');
  });

  test('User cannot apply for the same job twice', async () => {
    await homePage.searchJob('Software');
    await jobListPage.openJob(0);
    await jobDetailPage.applyForJob();
    await jobDetailPage.applyForJob(); // Try again
    const error = await jobDetailPage.getErrorMessage();
    expect(error).toContain('Already applied');
  });

  test('User cannot apply without login', async ({ page }) => {
    await accountPage.logout();
    await homePage.searchJob('Software');
    await jobListPage.openJob(0);
    await jobDetailPage.applyForJob();
    await expect(page).toHaveURL(/login/);
  });
});