export class BillPay {

  url = "/billpay.htm";

  elements = {
    getPayeeNameTextbox: () => cy.get("[name='payee.name']"),
    getAddressTextbox: () => cy.get("[name='payee.address.street']"),
    getCityTextbox: () => cy.get("[name='payee.address.city']"),
    getStateTextbox: () => cy.get("[name='payee.address.state']"),
    getZipCodeTextbox: () => cy.get("[name='payee.address.zipCode']"),
    getPhoneNumberTextbox: () => cy.get("[name='payee.phoneNumber']"),
    getAccountNumberTextbox: () => cy.get("[name='payee.accountNumber']"),
    getVerifyAccountNumberTextbox: () => cy.get("[name='verifyAccount']"),
    getAmountTextbox: () => cy.get("[name='amount']"),
    getFromAccountDropdown: () => cy.get("[name='fromAccountId']"),
    getSendPaymentBtn: () => cy.get("[value='Send Payment']")
  }

  navigate() {
    cy.visit(this.url);
  }

  inputPayeeName(payeeName) {
    this.elements
      .getPayeeNameTextbox()
      .type(payeeName);
  }

  inputAddress(address) {
    this.elements
      .getAddressTextbox()
      .type(address);
  }

  inputCity(city) {
    this.elements
      .getCityTextbox()
      .type(city);
  }

  inputState(state) {
    this.elements
      .getStateTextbox()
      .type(state);
  }

  inputZipCode(zipCode) {
    this.elements
      .getZipCodeTextbox()
      .type(zipCode);
  }

  inputPhoneNumber(phoneNumber) {
    this.elements
      .getPhoneNumberTextbox()
      .type(phoneNumber);
  }

  inputAccountNumber(accountNumber) {
    this.elements
      .getAccountNumberTextbox()
      .type(accountNumber);
  }

  inputVerifyAccountNumber(accountNumber) {
    this.elements
      .getVerifyAccountNumberTextbox()
      .type(accountNumber);
  }

  inputAmount(amount) {
    this.elements
      .getAmountTextbox()
      .type(amount);
  }

  selectFromAcount(accountNumber) {
    this.elements
      .getFromAccountDropdown()
      .select(accountNumber);
  }

  clickSendPayment() {
    this.elements
      .getSendPaymentBtn()
      .click();
  }
  
}

export const BillPayPage = new BillPay();