/// <reference types="cypress" />

describe("Home page displays form and only one random anime", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("displays form", () => {
    cy.get("#form").should("be.visible");
    cy.get("select").should("have.length", 4);
    cy.get("#score").should("have.length", 1);
  });

  it("displays one card with an anime suggestion", () => {
    cy.get(".card").should("be.visible");
    cy.get(".card").should("have.length", 1);
  });
  afterEach(() => {
    cy.wait(2000);
  });
});

describe("Search animes with no criteria", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("displays three random animes", () => {
    cy.get('[value="Submit"]').click();
    cy.get(".card").should("have.length", 3);
  });
  afterEach(() => {
    cy.wait(2000);
  });
});

describe("Search animes using form filters", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("displays three random animes", () => {
    cy.get("#sfw").select("Yes");
    cy.get("#type").select("Tv");
    cy.get("#status").select("Complete");
    cy.get("#rating").select("PG - Children");
    cy.get("#score").as("range").invoke("val", 3).trigger("change");
    cy.get('[value="Submit"]').click();
    cy.get(".card").should("have.length", 3);
  });
  afterEach(() => {
    cy.wait(2000);
  });
});
