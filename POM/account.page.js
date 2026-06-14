// Account page actions for JobClass
class AccountPage {
  constructor(page) {
    this.page = page;
    this.myAccountDropdown = 'a:has-text("MY ACCOUNT")';
    this.personalHomeLink = 'a:has-text("Personal Home")';
    this.myAdsLink = 'a:has-text("My ads")';
    this.favoriteAdsLink = 'a:has-text("Favourite ads")';
    this.signoutLink = 'a:has-text("Signout")';
    this.welcomeMessage = '.welcome-message';
  }

  async goToMyAds() {
    await this.page.click(this.myAdsLink);
  }

  async goToFavorites() {
    await this.page.click(this.favoriteAdsLink);
  }

  async goToPersonalHome() {
    await this.page.click(this.personalHomeLink);
  }

  async logout() {
    await this.page.click(this.signoutLink);
  }

  async getWelcomeMessage() {
    return await this.page.textContent(this.welcomeMessage);
  }
}

export default AccountPage;