describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("search bar visible and functional", () => {
    cy.get('[data-cy="search-bar"]').should("exist");
    cy.get('[data-cy="search-bar"]')
      .first()
      .type("car{enter}")
      .url()
      .should("contain", "/search?q=car");
  });

  it("category list visible", () => {
    cy.get('[ data-cy="nav-categories"]').should("exist");
  });

  it("displays hero section", () => {
    cy.get('[data-cy="hero-section"]').should("exist");
  });

  it("renders Categories section", () => {
    cy.contains("Top Categories").should("exist");
    cy.get('[data-cy="home-categories"]').should("have.length", 5);
  });

  it("renders Trending Items with price", () => {
    cy.contains("Trending Items").should("exist");
    cy.get('[data-cy="item-card"]').should("have.length.at.least", 2);

    cy.get('[data-cy="item-card"]').each(($card) => {
      cy.wrap($card).contains("ብር").should("exist");
    });
  });

  it("navigates to and item detail when clicked", () => {
    cy.get('[data-cy="item-card"]').first().click();
    cy.url().should("include", "/item");
  });

  it("displays browse category links", () => {
    cy.scrollTo("bottom");
    cy.get('[data-cy="brose-more"]').within(() => {
      cy.contains("Browse More by Category").should("exist");
      cy.contains("Electronics").click();
      cy.url().should("include", "category=Electronics");
    });
  });
});
