export class RightPanel {

  elements = {
    getTitleHeading: () => cy.get("#rightPanel .title")
  }

}

export const RightPanelPage = new RightPanel();