import { AccountServicesLeftPanelPage } from "../pages/AccountServicesLeftPanel";
import { AccountsOverviewPage } from "../pages/AccountsOverview";
import { BillPayPage } from "../pages/BillPay";
import { HeaderLeftMenuPage } from "../pages/HeaderLeftMenu";
import { HomePage } from "../pages/Home";
import { LoginPage } from "../pages/Login";
import { OpenNewAccountPage } from "../pages/OpenNewAccount";
import { RegisterPage } from "../pages/Register";
import { RightPanelPage } from "../pages/RightPanel";
import { TransferFundsPage } from "../pages/TransferFunds";
import { randomName } from "../support/utility";

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

const biller = {
  payeeName: "Telstra",
  address: "100 Street",
  city: "melbourne",
  state: "victoria",
  zipCode: "3000",
  phoneNumber: "0123456789",
  accountNumber: "1234567",
  amount: "8.18"
}

describe('End to End', () => {

  it("navigate to parabank app successfully", () => {
    HomePage.navigate();

    cy.url()
      .should("contain", "parabank/index.htm;jsessionid=");

  });

  it("global navigation in home page is working as expected", () => {
    HomePage.navigate();

    HeaderLeftMenuPage.elements.getAboutUsLink()
      .click()
      .url()
      .should("contain", "about");

    HeaderLeftMenuPage.elements.getServicesLink()
      .click()
      .url()
      .should("contain", "services");

    HeaderLeftMenuPage.elements.getProductsLink()
      .should("have.attr", "href", "http://www.parasoft.com/jsp/products.jsp");

    HeaderLeftMenuPage.elements.getContactsLink()
      .should("have.attr", "href", "http://www.parasoft.com/jsp/pr/contacts.jsp");

    HeaderLeftMenuPage.elements.getAdminPageLink()
      .click()
      .url()
      .should("contain", "admin");
  });

  it("should create a new user and login, create account, displaying balance, transfering funds and paying bill should be successful", () => {

    //Create user and login
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

    AccountsOverviewPage
      .elements
      .getAccountTable()
      .find("a")
      .invoke("text")
      .then(accountId => cy.wrap(accountId).as("firstAccountId"));

    //Create new savings account
    OpenNewAccountPage.navigate();
    OpenNewAccountPage.selectAccountType("SAVINGS");
    OpenNewAccountPage.clickOpenNewAccount();

    RightPanelPage.elements.getTitleHeading()
      .should("have.text", "Account Opened!");

    OpenNewAccountPage.elements.getnewAccountIdLink()
      .invoke("text")
      .then(accountId => cy.wrap(accountId).as("secondAccountId"));

    //validate balance details as expected
    AccountsOverviewPage.navigate();

    cy.get("@firstAccountId")
      .then(firstAccountId => {
        cy.log("firstaccountId:" + firstAccountId)
        cy.contains(firstAccountId)
          .parent()
          .next()
          .should("contain.text", "$415.50");
      });

    cy.get("@secondAccountId")
      .then(secondAccountId => {
        cy.contains(secondAccountId)
          .parent()
          .next()
          .should("contain.text", "$100.00");
      });

    //Transfer Funds
    const transferAmount = "20";

    TransferFundsPage.navigate();
    TransferFundsPage.inputAmount(transferAmount);

    cy.get("@secondAccountId")
      .then(secondAccountId => {
        TransferFundsPage.selectFromAccount(secondAccountId);
      });

    cy.get("@firstAccountId")
      .then(firstAccountId => {
        TransferFundsPage.selectToAccount(firstAccountId);
      });

    TransferFundsPage.clickTransfer();

    RightPanelPage.elements.getTitleHeading()
      .should("have.text", "Transfer Complete!");

    TransferFundsPage.elements.getAmountTextbox()
      .should("contain.text", transferAmount)
      .parent()
      .should("contain.text", "has been transferred");

    //Pay Bills
    BillPayPage.navigate();
    BillPayPage.inputPayeeName(biller.payeeName);
    BillPayPage.inputAddress(biller.address);
    BillPayPage.inputCity(biller.city);
    BillPayPage.inputState(biller.state);
    BillPayPage.inputZipCode(biller.zipCode);
    BillPayPage.inputPhoneNumber(biller.phoneNumber);
    BillPayPage.inputAccountNumber(biller.accountNumber);
    BillPayPage.inputVerifyAccountNumber(biller.accountNumber);
    BillPayPage.inputAmount(biller.amount);


    cy.get("@secondAccountId")
      .then(secondAccountId => {
        BillPayPage.selectFromAcount(secondAccountId);
      });

    BillPayPage.clickSendPayment();

    RightPanelPage.elements.getTitleHeading()
      .should("contain.text", "Bill Payment Complete");

    //find transaction by amount via Api should be succesful
    cy.get("@secondAccountId")
      .then(secondAccountId => {
        cy.request({
          method: "GET",
          url: `/services/bank/accounts/${secondAccountId}/transactions/amount/${biller.amount}`,
          headers: {
            'accept': 'application/json'
          }
        })
          .then(r => {
            const first = r.body[0];
            expect(first.accountId).to.eq(+secondAccountId);
            expect(first.type).to.eq("Debit");
            expect(first.amount).to.eq(+biller.amount);
            expect(first.description).to.eq(`Bill Payment to ${biller.payeeName}`);
          })
      });

  });

})