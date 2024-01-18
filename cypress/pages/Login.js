export class Login {

  elements = {
    getUsernameTextBox: () => cy.get("[name='username']"),
    getPasswordTextBox: () => cy.get("[name='password']"),
    getSubmitBtn: () => cy.get("[value='Log In']"),
  }

  login(username, password) {

    this.elements
      .getUsernameTextBox()
      .type(username);

    this.elements
      .getPasswordTextBox()
      .type(password);

    this.elements
      .getSubmitBtn()
      .click();

  }

}

export const LoginPage = new Login();