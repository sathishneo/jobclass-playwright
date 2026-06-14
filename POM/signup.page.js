// Signup page actions for JobClass (with resume upload)
class SignupPage {
  constructor(page) {
    this.page = page;
    this.genderDropdown = page.locator('#select2-gender-container')
    this.nameInput = page.getByRole('textbox', { name: 'Name' })
    this.employerRadio = page.getByRole('radio', { name: 'Employer' })
    this.jobSeekerRadio = page.getByRole('radio', { name: 'Job seeker' })
    this.countryDropdown = page.locator('#select2-country-container')
    this.phoneInput = page.getByRole('textbox', { name: 'Phone Number' })
    this.emailInput = page.getByRole('textbox', { name: 'Email *' })
    this.passwordInput = page.getByRole('textbox', { name: 'Password' })
    this.confirmPasswordInput = page.getByRole('textbox', { name: 'Password Confirmation' })
    this.resumeInput = page.locator('#resume')
    this.termsCheckbox = page.getByRole('checkbox')
    this.registerButton = page.getByRole('button', { name: 'Register' })
    this.errorMessage = page.getByText('Oops ! An error has occurred. Please correct the red fields in the form', { exact: true })
  }

  async fillSignupForm(userData) {
    if (userData.gender) {
      await this.page.selectOption(this.genderDropdown, userData.gender);
    }
    await this.page.fill(this.nameInput, userData.name);
    
    // Select user type
    if (userData.userType === 'Employer') {
      await this.page.click(this.employerRadio);
    } else {
      await this.page.click(this.jobSeekerRadio);
    }
    
    if (userData.country) {
      await this.page.selectOption(this.countryDropdown, userData.country);
    }
    await this.page.fill(this.phoneInput, userData.phone);
    await this.page.fill(this.emailInput, userData.email);
    await this.page.fill(this.passwordInput, userData.password);
    await this.page.fill(this.confirmPasswordInput, userData.password);
    
    // Handle resume upload if provided
    if (userData.resume) {
      await this.page.setInputFiles(this.resumeInput, userData.resume);
    }
    
    if (userData.agreeTerms) {
      await this.page.click(this.termsCheckbox);
    }
  }

  async submit() {
    await this.page.click(this.registerButton);
  }

  async getErrorMessage() {
    return await this.page.textContent(this.errorMessage);
  }
}

export default SignupPage;