export class AccountsOverview {

  url = "/overview.htm";

  elements = {
    getAccountTable: () => cy.get("#accountTable"),
  }

  navigate() {
    cy.visit(this.url);
  }

}

export const AccountsOverviewPage = new AccountsOverview();