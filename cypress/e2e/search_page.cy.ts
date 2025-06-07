describe("Search Page", () => {
  beforeEach(() => {
    cy.visit("/search?q=a");
  });

  it("should display the search bar and allow typing", () => {
    cy.get('[data-cy="search-bar"]').should("exist").should("have.value", "a");
    cy.get('[data-cy="search-bar"]').first().clear().type("boots");
  });

  it("should show category filters and allow selection", () => {
    cy.contains("Category").should("exist");
    cy.get('[data-cy="category-filter-btn"]').should("exist");
    cy.get('[data-cy="category-filter-btn"]')
      .get("label")
      .contains("Electronics")
      .click();
    cy.url().should("include", "category=Electronics");
    cy.get('[data-cy="category-filter-btn"]')
      .get("label")
      .contains("Fashion")
      .click();
    cy.url().should("include", "category=Fashion");
  });

  it("should show condition filters and allow selection", () => {
    cy.contains("Condition").should("exist");
    cy.get('[data-cy="condition-filter-btn"]').contains("New").click();
    cy.url().should("include", "condition=New");
  });

  it("each product card should contain price and img", () => {
    cy.get('[data-cy="item-card"]').each(($card) => {
      cy.wrap($card).find("img").should("exist");
      cy.wrap($card)
        .contains(/[\d,]+ ብር/)
        .should("exist");
    });
  });
  it("should navigate to item page when a product card is clicked", () => {
    cy.get('[data-cy="item-card"]').first().click();
    cy.url().should("include", "/item");
  });
});
