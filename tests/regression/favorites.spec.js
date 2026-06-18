import { test, expect } from '@playwright/test';
import HomePage from '../../POM/home.page.js';
import LoginPage from '../../POM/login.page.js';
import JobListPage from '../../POM/jobList.page.js';
import JobDetailPage from '../../POM/jobDetail.page.js';
import AccountPage from '../../POM/account.page.js';
import users from '../../testData/users.json' assert { type: 'json' };

test.describe('Favorites Regression Tests', () => {
  let homePage, loginPage, jobListPage, jobDetailPage, accountPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    jobListPage = new JobListPage(page);
    jobDetailPage = new JobDetailPage(page);
    accountPage = new AccountPage(page);
    
    await homePage.navigate();
    await homePage.goToLogin();
    await loginPage.fillLoginForm(users.jobSeeker.email, users.jobSeeker.password);
    await loginPage.submit();
  });

  test.skip('User can save a job to favorites', async () => {
    await homePage.searchJob('Software');
    await jobListPage.openJob(0);
    await jobDetailPage.saveJob();
    await accountPage.goToFavorites();
    const jobCount = await jobListPage.getJobCount();
    expect(jobCount).toBeGreaterThan(0);
  });

  test.skip('User can remove a job from favorites', async () => {
    await homePage.searchJob('Software');
    await jobListPage.saveJob(0);
    await jobListPage.saveJob(0); // Click again to unsave
    await accountPage.goToFavorites();
    const jobCount = await jobListPage.getJobCount();
    expect(jobCount).toBe(0);
  });

  test.skip('User cannot save job without login', async ({ page }) => {
    await accountPage.logout();
    await homePage.searchJob('Software');
    await jobListPage.saveJob(0);
    await expect(page).toHaveURL(/login/);
  });
});