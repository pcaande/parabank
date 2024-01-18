export class Home {

  url = "/";

  elements = {

    
  }

  navigate() {
    cy.visit(this.url);
  }

  
}

export const HomePage = new Home();