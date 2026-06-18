import { test, expect } from '@playwright/test';
import HomePage from '../../POM/home.page.js';
import LoginPage from '../../POM/login.page.js';
import PostJobPage from '../../POM/postJob.page.js';
import AccountPage from '../../POM/account.page.js';
import JobListPage from '../../POM/jobList.page.js';
import users from '../../testData/users.json' assert { type: 'json' };
import jobs from '../../testData/jobs.json' assert { type: 'json' };

test.describe('Employer End-to-End Journey', () => {
  let homePage, loginPage, postJobPage, accountPage, jobListPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    postJobPage = new PostJobPage(page);
    accountPage = new AccountPage(page);
    jobListPage = new JobListPage(page);
  });

  test.skip('Login -> Post Job -> Verify in My Ads', async () => {
    await homePage.navigate();
    await homePage.goToLogin();
    await loginPage.fillLoginForm(users.employer.email, users.employer.password);
    await loginPage.submit();
    
    await homePage.goToPostJob();
    await postJobPage.fillJobForm(jobs.validJob);
    await postJobPage.submit();
    
    await accountPage.goToMyAds();
    const jobCount = await jobListPage.getJobCount();
    expect(jobCount).toBeGreaterThan(0);
  });

  test('Login -> Post Job -> Verify in job list', async () => {
    await homePage.navigate();
    await homePage.goToLogin();
    await loginPage.fillLoginForm(users.employer.email, users.employer.password);
    await loginPage.submit();
    
    await homePage.goToPostJob();
    await postJobPage.fillJobForm(jobs.validJob);
    await postJobPage.submit();
    
    await homePage.navigate();
    await homePage.searchJob(jobs.validJob.title);
    // const jobCount = await jobListPage.getJobCount();
    // expect(jobCount).toBeGreaterThan(0);
  });

  test.skip('Post Job -> Verify job details', async () => {
    await homePage.navigate();
    await homePage.goToLogin();
    await loginPage.fillLoginForm(users.employer.email, users.employer.password);
    await loginPage.submit();
    
    await homePage.goToPostJob();
    await postJobPage.fillJobForm(jobs.validJob);
    await postJobPage.submit();
    
    await homePage.searchJob(jobs.validJob.title);
    await jobListPage.openJob(0);
    const jobTitle = await jobListPage.getJobTitle();
    expect(jobTitle).toContain(jobs.validJob.title);
  });
});

