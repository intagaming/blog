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
      cy.get("@theArticle").click();
      cy.get("@articleTitle", { timeout: 10000 }).should("exist");
    });

    it("can visit the about and contact page", () => {
      cy.contains(/^about/i).click();
      cy.url({ timeout: 10000 }).should("match", /about/i);
      cy.get("h1").contains(/about/i);

      cy.contains(/^contact/i).click();
      cy.url({ timeout: 10000 }).should("match", /contact/i);
      cy.get("h1").contains(/contact/i);
    });
  });
});
