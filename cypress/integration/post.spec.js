describe("Post", function () {
  before(() => {
    cy.visit("/test");
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
    // At least contains a year
    cy.get("@authorAndBrief").contains(/[12][0-9]{3}/);
    // Read time brief
    cy.get("@authorAndBrief").contains("min read");
  });

  it("has the cover image", () => {
    cy.get(`[data-testid="cover-image"] img`).should("exist");
  });

  it("headers are linked and tagged correctly", () => {
    cy.get(`[data-testid="blog-content"] h2`).first().as("firstH2");

    cy.get("@firstH2")
      .parent()
      .then((el) => {
        // Expect to be a linked <a>
        expect(el.prop("tagName")).to.be.match(/a/i);
        const href = el.prop("href");
        const regex = /https?:\/\/.*\/[^#]+#(.+)/;
        expect(href).to.match(regex);

        const match = href.match(regex);
        const id = match[1];

        // Expect to have an exact match
        cy.get("@firstH2").should("have.id", id);
      });
  });
});
