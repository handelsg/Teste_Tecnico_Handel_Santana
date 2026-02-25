// cypress/support/commands.ts
// Comandos customizados do Cypress

Cypress.Commands.add("waitForLaunches", () => {
  cy.get('[data-testid="launch-card"]', { timeout: 20000 }).should(
    "have.length.greaterThan",
    0
  );
});

declare global {
  namespace Cypress {
    interface Chainable {
      waitForLaunches(): Chainable<void>;
    }
  }
}
