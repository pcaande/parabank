export class HeaderLeftMenu {

  elements = {

    getAboutUsLink: () => cy.get(".leftmenu [href='about.htm']"),
    getServicesLink: () => cy.get(".leftmenu [href='services.htm']"),
    getProductsLink: () => cy.get(".leftmenu [href='http://www.parasoft.com/jsp/products.jsp']"),
    getContactsLink: () => cy.get(".leftmenu [href='http://www.parasoft.com/jsp/pr/contacts.jsp']"),
    getAdminPageLink: () => cy.get(".leftmenu [href='admin.htm']"),

  }

  clickAboutUs(){
    this.elements
      .getAboutUsLink()
      .click();
  }

  clickServices(){
    this.elements
      .getServicesLink()
      .click();
  }

  clickProducts(){
    this.elements
      .getProductsLink()
      .click();
  }

  clickContacts(){
    this.elements
      .getContactsLink()
      .click();
  }

  clickAdminPage(){
    this.elements
      .getAdminPageLink()
      .click();
  }

}

export const HeaderLeftMenuPage = new HeaderLeftMenu();