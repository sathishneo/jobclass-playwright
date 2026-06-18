// Account page actions for JobClass
class AccountPage {
  constructor(page) {
    this.page = page;
    this.myAccountDropdown = page.locator("//a[@href='#MyClassified']//i[@class='fa fa-angle-down']");
    this.personalHomeLink = page.locator('a.active:visible')
    this.myAdsLink = page.locator("//a[normalize-space()='My ads']")
    this.favoriteAdsLink = page.locator("//a[normalize-space()='Favourite ads']")
    this.signoutLink = page.getByRole('link', { name: 'Signout' })
    this.welcomeMessage = page.locator(".page-sub-header2.clearfix.no-padding")
  }

  async goToMyAds() {
    await this.myAdsLink.click();
  }

  async goToFavorites() {
    await this.favoriteAdsLink.click();
  }

  async goToPersonalHome() {
    await this.personalHomeLink.click();
  }

  async logout() {
    await this.signoutLink.click();
  }

  async getWelcomeMessage() {
    return await this.page.textContent(this.welcomeMessage);
  }
}

export default AccountPage;