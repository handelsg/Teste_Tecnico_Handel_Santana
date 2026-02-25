// cypress/e2e/launch-detail.cy.ts
describe("Página de Detalhes do Lançamento", () => {
  // ID de um lançamento conhecido (FalconSat - primeiro lançamento SpaceX)
  const KNOWN_LAUNCH_ID = "5eb87cd9ffd86e000604b32a";

  beforeEach(() => {
    cy.visit(`/launches/${KNOWN_LAUNCH_ID}`);
  });

  it("exibe o nome da missão", () => {
    cy.contains("FalconSat", { timeout: 10000 }).should("be.visible");
  });

  it("exibe badge de status", () => {
    cy.get('[data-testid="status-badge"]', { timeout: 10000 }).should("be.visible");
  });

  it("exibe seção de informações do foguete", () => {
    cy.contains("Foguete", { timeout: 10000 }).should("be.visible");
    cy.contains("Falcon 1").should("be.visible");
  });

  it("exibe botão para voltar ao catálogo", () => {
    cy.contains("Voltar ao catálogo").should("be.visible");
  });

  it("botão voltar navega para /launches", () => {
    cy.contains("Voltar ao catálogo").click();
    cy.url().should("include", "/launches");
    cy.url().should("not.match", /\/launches\/.+/);
  });

  it("exibe seção de sobre a missão quando há descrição", () => {
    cy.contains("Sobre a Missão", { timeout: 10000 }).should("be.visible");
  });

  it("página 404 é exibida para ID inválido", () => {
    cy.visit("/launches/id-inexistente-xyz", { failOnStatusCode: false });
    cy.contains("404").should("be.visible");
  });
});
