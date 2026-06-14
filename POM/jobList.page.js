// Job list page actions for JobClass
class JobListPage {
  constructor(page) {
    this.page = page;
    this.jobCards = page.getByRole('link', { name: 'Party planners' })
    this.jobTitle = page.getByRole('link', { name: 'DJ' })
    this.saveJobButton = page.locator('a').filter({ hasText: 'Save Job' }).first()
    this.emailJobButton = page.locator('a').filter({ hasText: 'Email Job' }).first()
    this.datePostedFilter = page.locator('span.info-row').locator('span').nth(0)
    this.jobTypeFilter = page.locator('span.info-row').locator('span').nth(2)
  }

  async openJob(index = 0) {
    await this.page.click(`${this.jobCards}:nth-child(${index + 1}) ${this.jobTitle}`);
  }

  async saveJob(index = 0) {
    await this.page.click(`${this.jobCards}:nth-child(${index + 1}) ${this.saveJobButton}`);
  }

  async getJobCount() {
    return await this.page.locator(this.jobCards).count();
  }

  async filterByJobType(jobType) {
    await this.page.click(`input[name="job_type"][value="${jobType}"]`);
  }
}

export default JobListPage;