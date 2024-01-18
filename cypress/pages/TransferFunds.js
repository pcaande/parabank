export class TransferFunds {

  url = "/transfer.htm";

  elements = {
    getAmountTextbox: () => cy.get("#amount"),
    getFromAccountIdDropdown: () => cy.get("#fromAccountId"),
    getToAccountIdDropdown: () => cy.get("#toAccountId"),
    getTransferBtn: () => cy.get("[value='Transfer']")
  }

  navigate() {
    cy.visit(this.url);
  }

  inputAmount(firstName) {
    this.elements
      .getAmountTextbox()
      .type(firstName);
  }

  selectFromAccount(accountNumber) {
    this.elements
      .getFromAccountIdDropdown()
      .select(accountNumber);
  }

  selectToAccount(accountNumber) {
    this.elements
      .getToAccountIdDropdown()
      .select(accountNumber);
  }

  clickTransfer() {
    this.elements
      .getTransferBtn()
      .click();
  }

}

export const TransferFundsPage = new TransferFunds();