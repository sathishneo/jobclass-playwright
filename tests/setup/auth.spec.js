  import test from "@playwright/test";
import LoginPage from "../../POM/login.page";
import HomePage from "../../POM/home.page";
import users from '../../testData/users.json' assert { type: 'json' };

let loginPage1;
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
     loginPage1 = new LoginPage(page);
    await homePage.navigate();
    await homePage.goToLogin();
  });

    test('login for storege state',async({page})=>{
     await loginPage1.fillLoginForm(users.jobSeeker.email, users.jobSeeker.password);
    await loginPage1.submit();  
    await page.context().storageState({path:"auth/JobSeeker.auth.json"})

});