import { AccountServicesLeftPanelPage } from "../pages/AccountServicesLeftPanel";
import { HomePage } from "../pages/Home";
import { LoginPage } from "../pages/Login";
import { RegisterPage } from "../pages/Register";
import { randomName } from "../support/utility";

describe('Navigation', () => {

  it('navigate to Para bank application', () => {

    HomePage.navigate();

    cy.url()
      .should("contain", "parabank/index.htm;jsessionid=");

  });

  it('verify if the Global navigation menu in home page is working as expected', () => {

    const user = {
      userName: randomName(10),
      passWord: "password"
    }

    RegisterPage.navigate();
    RegisterPage.createUserApi(user.userName);

    LoginPage.login(user.userName, user.passWord);

    AccountServicesLeftPanelPage.elements.getOpenNewAccountLink()
      .click()
      .url()
      .should("contain", "openaccount");

    AccountServicesLeftPanelPage.elements.getAccountsOverviewLink()
      .click()
      .url()
      .should("contain", "overview");

    AccountServicesLeftPanelPage.elements.getTransferFundsLink()
      .click()
      .url()
      .should("contain", "transfer");

    AccountServicesLeftPanelPage.elements.getBillsPayLink()
      .click()
      .url()
      .should("contain", "billpay");

    AccountServicesLeftPanelPage.elements.getFindTransLink()
      .click()
      .url()
      .should("contain", "findtrans");

    AccountServicesLeftPanelPage.elements.getUpdateProfileLink()
      .click()
      .url()
      .should("contain", "updateprofile");

    AccountServicesLeftPanelPage.elements.getRequestLoanLink()
      .click()
      .url()
      .should("contain", "requestloan");

    AccountServicesLeftPanelPage.elements.getLogoutLink()
      .click()
      .url()
      .should("contain", "index");

  });

})