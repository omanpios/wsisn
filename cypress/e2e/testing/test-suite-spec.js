/// <reference types="cypress" />

describe("What should I see next?", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays one card with an anime suggestion", () => {
    cy.get('.card').should('be.visible')
  });
});
