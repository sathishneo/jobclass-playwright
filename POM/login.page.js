// Login page actions for JobClass
class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Email Address:' })
    this.passwordInput = page.getByRole('textbox', { name: 'Password:' })
    this.loginButton = page.getByRole('button', { name: 'Login' })
    this.errorMessage = page.locator("ul[class='list list-check'] li")
    this.keepLoggedInCheckbox =page.getByRole('checkbox')
  }

async fillLoginForm(email, password) {
  await this.emailInput.fill(email);
  await this.passwordInput.fill(password);
}

async submit() {
  await this.loginButton.click();
}

async getErrorMessage() {
  return await this.errorMessage.textContent();
}
}

export default LoginPage;