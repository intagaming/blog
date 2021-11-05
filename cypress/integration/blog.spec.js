describe("blog", () => {
  it("has a greeting", () => {
    cy.visit("/");
    cy.get("h1").should("not.be.empty");
  });
});
