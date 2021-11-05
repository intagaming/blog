describe("blog", () => {
  it("shows initial blogs", () => {
    cy.visit("/");

    cy.get("article h2").should("exist");
    cy.get("article p").should("exist");
  });
});
