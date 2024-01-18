import { AccountServicesLeftPanelPage } from "../pages/AccountServicesLeftPanel";
import { LoginPage } from "../pages/Login";
import { RegisterPage } from "../pages/Register";
import { randomName } from "../support/utility";

describe('Register Page', () => {

  before(() => { RegisterPage.navigate() });

  it('should create a new user and login successfully', () => {

    const user = {
      firstName: "john",
      lastName: "smith",
      address: "100 Street",
      city: "melbourne",
      state: "victoria",
      zipCode: "3000",
      phoneNumber: "0123456789",
      ssn: "12345",
      userName: randomName(10),
      passWord: "password"
    }

    RegisterPage.navigate();
    RegisterPage.inputFirstName(user.firstName);
    RegisterPage.inputLastName(user.lastName);
    RegisterPage.inputAddress(user.address);
    RegisterPage.inputCity(user.city);
    RegisterPage.inputState(user.state);
    RegisterPage.inputZipCode(user.zipCode);
    RegisterPage.inputPhoneNumber(user.phoneNumber);
    RegisterPage.inputSsn(user.ssn);
    RegisterPage.inputUserName(user.userName);
    RegisterPage.inputPassword(user.passWord);
    RegisterPage.inputConfirmPassword(user.passWord);
    RegisterPage.clickRegister();

    RegisterPage.elements
      .getTitleHeading()
      .should("contain.text", `Welcome ${user.userName}`)
      .next()
      .should("contain.text", `Your account was created successfully`);

    AccountServicesLeftPanelPage.clickLogout();
    LoginPage.login(user.userName, user.passWord);

    cy.url()
      .should("contain", "overview.htm");

  });

})