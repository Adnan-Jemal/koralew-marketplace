describe("item page", () => {
  beforeEach(() => {
    cy.visit("item/1040");
  });

  it("displays the item title", () => {
    cy.get('[data-cy="item-title"]').should("exist").and("not.be.empty");
  });

  it("displays at least one image", () => {
    cy.get('[data-cy="item-image-list"]').should("have.length.at.least", 1);
  });

  it("displays the item price", () => {
    cy.get('[data-cy="item-price"]').should("exist").and("contain.text", "ብር");
  });

  it("shows the item's condition", () => {
    cy.get('[data-cy="item-condition"]').should("exist").and("not.be.empty");
  });
  it("shows the item's condition", () => {
    cy.get('[data-cy="item-category"]').should("exist").and("not.be.empty");
  });

  it("displays the description", () => {
    cy.get('[data-cy="item-description"]').should("exist").and("not.be.empty");
  });

  it("has a contact & message button", () => {
    cy.get('[data-cy="contact-seller-btns"]').should("exist");
  });
  it("should contain similar items list", () => {
    cy.contains("Similar Items").should("exist");
  });
  it("each similar product card should contain price and img", () => {
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
