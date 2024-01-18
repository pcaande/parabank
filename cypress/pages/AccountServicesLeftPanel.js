export class AccountServicesLeftPanel {

  elements = {

    getOpenNewAccountLink: () => cy.get("[href='/parabank/openaccount.htm']"),
    getAccountsOverviewLink: () => cy.get("[href='/parabank/overview.htm']"),
    getTransferFundsLink: () => cy.get("[href='/parabank/transfer.htm']"),
    getBillsPayLink: () => cy.get("[href='/parabank/billpay.htm']"),
    getFindTransLink: () => cy.get("[href='/parabank/findtrans.htm']"),
    getUpdateProfileLink: () => cy.get("[href='/parabank/updateprofile.htm']"),
    getRequestLoanLink: () => cy.get("[href='/parabank/requestloan.htm']"),
    getLogoutLink: () => cy.get("[href='/parabank/logout.htm']"),
    getWelcomeText: () => cy.get("#leftPanel .smallText")
  }

  clickOpenNewAccount() {
    this.elements
      .getOpenNewAccountLink()
      .click();
  }

  clickLogout() {
    this.elements
      .getLogoutLink()
      .click();
  }

}

export const AccountServicesLeftPanelPage = new AccountServicesLeftPanel();