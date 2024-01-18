export class OpenNewAccount {

  url = "/openaccount.htm";

  elements = {
    getAccountTypeDropdown: () => cy.get("#type"),
    getFromAcountDropdown: () => cy.get("#fromAccountId"),
    getOpenNewAccountBtn: () => cy.get("[value='Open New Account']"),
    getnewAccountIdLink: () => cy.get("#newAccountId")
  }

  navigate() {
    cy.visit(this.url);
  }

  selectAccountType(accountType) {
    this.elements
      .getAccountTypeDropdown()
      .select(accountType);
  }

  selectFromAccount(accountNumber) {
    this.elements
      .getAccountTypeDropdown()
      .select(accountNumber);
  }

  clickOpenNewAccount() {
    this.elements
      .getOpenNewAccountBtn()
      .click();
  }
  
}

export const OpenNewAccountPage = new OpenNewAccount();