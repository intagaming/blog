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

  it("headers are linked correctly", () => {
    cy.get(`[data-testid="blog-content"] h2`).first().as("firstH2");

    // Expect to be a linked <a>
    cy.get("@firstH2")
      .parent()
      .then((el) => {
        expect(el.prop("tagName")).to.be.match(/a/i);
        expect(el.prop("href")).to.match(/https?:\/\/.*\/[^#]+#.+/);
      });
  });
});
