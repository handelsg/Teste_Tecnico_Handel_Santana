// cypress/e2e/launches.cy.ts
describe("Catálogo de Lançamentos", () => {
  beforeEach(() => {
    cy.visit("/launches");
  });

  it("exibe o título da página", () => {
    cy.contains("Catálogo de Lançamentos").should("be.visible");
  });

  it("carrega e exibe cards de lançamentos", () => {
    cy.get('[data-testid="launch-card"]', { timeout: 20000 }).should(
      "have.length.at.least",
      1
    );
  });

  it("exibe o grid de lançamentos", () => {
    cy.get('[data-testid="launch-grid"]', { timeout: 20000 }).should("be.visible");
  });

  it("cada card exibe badge de status", () => {
    cy.get('[data-testid="launch-card"]', { timeout: 20000 })
      .first()
      .within(() => {
        cy.get('[data-testid="status-badge"]').should("be.visible");
      });
  });

  it("carrega mais lançamentos ao rolar (infinite scroll)", () => {
    cy.get('[data-testid="launch-card"]', { timeout: 20000 }).then(($cards) => {
      const initialCount = $cards.length;
      cy.scrollTo("bottom", { duration: 1000 });
      cy.wait(3000);
      cy.get('[data-testid="launch-card"]').should(
        "have.length.greaterThan",
        initialCount
      );
    });
  });

  it("clicar em um card navega para a página de detalhes", () => {
    cy.get('[data-testid="launch-card"]', { timeout: 20000 })
      .first()
      .click();
    cy.url().should("match", /\/launches\/.+/);
  });

  it("navbar navega de volta para a home", () => {
    cy.get("header").contains("Início").click();
    cy.url().should("eq", Cypress.config("baseUrl") + "/");
  });
});
