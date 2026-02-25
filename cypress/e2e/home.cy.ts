// cypress/e2e/home.cy.ts
describe("Página Inicial", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("exibe o título principal do portal", () => {
    cy.contains("Explorando o").should("be.visible");
    cy.contains("Universo").should("be.visible");
  });

  it("exibe a seção de lançamentos recentes", () => {
    cy.contains("Lançamentos Recentes").should("be.visible");
  });

  it("exibe cards de lançamentos na home", () => {
    cy.get('[data-testid="launch-card"]', { timeout: 20000 }).should(
      "have.length.at.least",
      1
    );
  });

  it("botão 'Ver todos os lançamentos' navega para /launches", () => {
    cy.contains("Ver todos os lançamentos").first().click();
    cy.url().should("include", "/launches");
  });

  it("navbar contém link para Lançamentos", () => {
    cy.get("header").contains("Lançamentos").should("be.visible");
  });

  it("navbar contém link para Início", () => {
    cy.get("header").contains("Início").should("be.visible");
  });

  it("footer está visível", () => {
    cy.scrollTo("bottom");
    cy.get("footer").should("be.visible");
  });
});
