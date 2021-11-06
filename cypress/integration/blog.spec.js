describe("blog", () => {
  before(() => {
    cy.visit("/");
  });

  it("shows initial blogs", () => {
    cy.get("article h2").should("exist");
    cy.get("article p").should("exist");
  });

  it("shows the links to About and Contact page", () => {
    cy.contains(/^about/i).should("have.attr", "href");
    cy.contains(/^contact/i).should("have.attr", "href");
  });
});
