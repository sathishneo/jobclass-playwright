// Homepage actions for JobClass
class HomePage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByRole('textbox', { name: 'What ?' })
    this.locationInput = page.getByRole('textbox', { name: /Where \?/i })
    this.searchButton = page.locator('//button[@class="btn btn-primary btn-search btn-block"]')
    this.postJobButton = page.getByRole('link', { name: 'Post a Job' })
    this.postAJob  =page.locator("//strong[contains(text(),'Post a Job')]")
    this.loginLink = page.getByRole('link', { name: 'Login' })
    this.signupLink = page.getByRole('link', { name: 'Signup' })
    this.browseJobsLink = page.getByRole('link', { name: 'Browse Jobs' })
  }

  async navigate() {
    await this.page.goto('http://202.83.16.221:9003/');
    await this.page.waitForLoadState('networkidle');
  }

async searchJob(keyword, location = '') {
  await this.searchInput.fill(keyword);

  if (location) {
    await this.locationInput.fill(location);
  }

  await this.searchButton.click();
}

  async goToPostJob() {
    await this.postJobButton.click();
  }

  async goToLogin() {
    await this.loginLink.click();
  }

  async goToSignup() {
    await this.signupLink.click();
  }

async goToBrowseJobs() {
  await this.browseJobsLink.click();
}
}

export default HomePage;