describe("Post", function () {
  before(() => {
    cy.visit("/");
    cy.get("article").first().click();
    cy.url({ timeout: 10000 }).should("match", /https?:\/\/.*\/.+/);
  });

  it("has the title", () => {
    cy.get("h1").should("exist");
  });

  it("has the correct author and brief", () => {
    cy.get(`[data-testid="author-and-brief"]`)
      .should("exist")
      .as("authorAndBrief");

    // Author avatar
    cy.get("@authorAndBrief").get("img").should("exist");
    cy.get("@authorAndBrief")
      // At least contains a year
      .contains(/[12][0-9]{3}/)
      // Read time brief
      .contains("min read");
  });
});
