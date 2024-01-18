export class Register {

  url = "/register.htm";

  elements = {
    getFirstNameTextbox: () => cy.get("#customer\\.firstName"),
    getLastNameTextbox: () => cy.get("#customer\\.lastName"),
    getAddressTextbox: () => cy.get("#customer\\.address\\.street"),
    getCityTextbox: () => cy.get("#customer\\.address\\.city"),
    getStateTextbox: () => cy.get("#customer\\.address\\.state"),
    getZipCodeTextbox: () => cy.get("#customer\\.address\\.zipCode"),
    getPhoneNumberTextbox: () => cy.get("#customer\\.phoneNumber"),
    getSsnTextbox: () => cy.get("#customer\\.ssn"),
    getUserNameTextbox: () => cy.get("#customer\\.username"),
    getPasswordTextbox: () => cy.get("#customer\\.password"),
    getConfirmPasswordTextbox: () => cy.get("#repeatedPassword"),
    getRegisterBtn: () => cy.get("[value='Register']"),
    getTitleHeading: () => cy.get(".title")
  }

  navigate() {
    cy.visit(this.url);
    cy.getCookie("JSESSIONID").then((cookie) =>
      cy.wrap(cookie.value)
        .as("jSessionId")
    );
  }

  inputFirstName(firstName) {
    this.elements
      .getFirstNameTextbox()
      .type(firstName);
  }

  inputLastName(lastName) {
    this.elements
      .getLastNameTextbox()
      .type(lastName);
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

  inputSsn(ssn) {
    this.elements
      .getSsnTextbox()
      .type(ssn);
  }

  inputUserName(username) {
    this.elements
      .getUserNameTextbox()
      .type(username);
  }

  inputPassword(password) {
    this.elements
      .getPasswordTextbox()
      .type(password);
  }

  inputConfirmPassword(confirmPassword) {
    this.elements
      .getConfirmPasswordTextbox()
      .type(confirmPassword);
  }

  clickRegister() {
    this.elements
      .getRegisterBtn()
      .click();
  }

  createUserApi(userName) {
    cy.get("@jSessionId")
      .then(jsessionId => {

        cy.request({
          method: "POST",
          url: `${this.url};jsessionid=${jsessionId}`,
          form: true,
          body: {
            "customer.firstName": "john",
            "customer.lastName": "smith",
            "customer.address.street": "100 Street",
            "customer.address.city": "melbourne",
            "customer.address.state": "victoria",
            "customer.address.zipCode": "3000",
            "customer.phoneNumber": "0123456789",
            "customer.ssn": "12345",
            "customer.username": userName,
            "customer.password": "password",
            "repeatedPassword": "password",
          }
        }).then( r => {
          expect(r.isOkStatusCode).eq(true);
        })
      })

  }

}

export const RegisterPage = new Register();