describe("home page", () => {
  before(() => {
    cy.visit("/");
  });

  describe("assure parts are available", () => {
    it("shows initial blogs", () => {
      cy.get("article h2").should("exist");
      cy.get("article p").should("exist");
    });

    it("shows the links to About and Contact page", () => {
      cy.contains(/^about/i).should("have.attr", "href");
      cy.contains(/^contact/i).should("have.attr", "href");
    });

    it("linked to social pages", () => {
      cy.get("a[href*=facebook], a[href*=github]").should("exist");
    });
  });

  describe("navigation", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("can visit a blog post", () => {
      cy.get("article").first().as("theArticle");
      cy.get("@theArticle").get("h2").as("articleTitle");
      cy.get("@theArticle").click({ timeout: 20000 });
      cy.contains("@articleTitle");
    });
  });
});
