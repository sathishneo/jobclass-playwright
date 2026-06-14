// Job detail page actions for JobClass
class JobDetailPage {
  constructor(page) {
    this.page = page;
    this.jobTitle = page.locator('//div[contains(@class, "ads-details-wrapper")]/h2/strong/a')
    this.jobDescription = page.getByRole('heading', { name: 'Job Details' })
    this.companyInfo = page.getByRole('heading', { name: 'Company Description' })
    //this.salary = '.salary';
    this.applyOnlineButton = page.locator('a').filter({ hasText: 'Apply Online' }).first()
    this.saveJobButton = page.getByText('Save ad', { exact: true })
    this.reportAbuseButton = page.getByRole('link', { name: 'Report abuse' })
    //this.reasonTextarea = 'textarea[name="reason"]';
    this.submitAbuseReportButton = page.getByRole('button', { name: 'Send Report' })
    this.errorMessage = '.error-message';
  }

  async getJobTitle() {
    return await this.page.textContent(this.jobTitle);
  }

  async applyForJob() {
    await this.page.click(this.applyOnlineButton);
  }

  async saveJob() {
    await this.page.click(this.saveJobButton);
  }

  async reportAbuse(reason) {
    await this.page.click(this.reportAbuseButton);
    await this.page.fill(this.reasonTextarea, reason);
    await this.page.click(this.submitAbuseReportButton);
  }

  async getConfirmationMessage() {
    return await this.page.textContent(this.confirmationMessage);
  }

  async getErrorMessage() {
    return await this.page.textContent(this.errorMessage);
  }
}

export default JobDetailPage;