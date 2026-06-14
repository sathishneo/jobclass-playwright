import { test, expect } from '@playwright/test';
import HomePage from '../../POM/home.page.js';
import SignupPage from '../../POM/signup.page.js';
import LoginPage from '../../POM/login.page.js';
import JobListPage from '../../POM/jobList.page.js';
import JobDetailPage from '../../POM/jobDetail.page.js';
import users from '../../testData/users.json' assert { type: 'json' };
import searchData from '../../testData/searchData.json' assert { type: 'json' };

test.describe('Job Seeker End-to-End Journey', () => {
  let homePage, signupPage, loginPage, jobListPage, jobDetailPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signupPage = new SignupPage(page);
    loginPage = new LoginPage(page);
    jobListPage = new JobListPage(page);
    jobDetailPage = new JobDetailPage(page);
  });

  test('Register -> Login -> Search -> View Job -> Apply', async () => {
    await homePage.navigate();
    await homePage.goToSignup();
    await signupPage.fillSignupForm(users.jobSeeker);
    await signupPage.submit();
    
    await loginPage.fillLoginForm(users.jobSeeker.email, users.jobSeeker.password);
    await loginPage.submit();
    
    await homePage.searchJob(searchData.validSearch.keyword);
    await jobListPage.openJob(0);
    await jobDetailPage.applyForJob();
    
    const confirmation = await jobDetailPage.getConfirmationMessage();
    expect(confirmation).toContain('Application submitted');
  });

  test('Register -> Login -> Search -> Save Job', async () => {
    await homePage.navigate();
    await homePage.goToSignup();
    await signupPage.fillSignupForm(users.jobSeeker);
    await signupPage.submit();
    
    await loginPage.fillLoginForm(users.jobSeeker.email, users.jobSeeker.password);
    await loginPage.submit();
    
    await homePage.searchJob(searchData.validSearch.keyword);
    await jobListPage.saveJob(0);
    // Verification would require navigating to favorites
  });

  test('Search -> View Job -> Report Abuse', async () => {
    await homePage.navigate();
    await homePage.searchJob(searchData.validSearch.keyword);
    await jobListPage.openJob(0);
    await jobDetailPage.reportAbuse('Fake job posting');
    const confirmation = await jobDetailPage.getConfirmationMessage();
    expect(confirmation).toContain('Abuse reported');
  });
});