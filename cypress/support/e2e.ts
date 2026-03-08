import "./commands";

beforeEach(() => {
  cy.task("db:reset");
  cy.task("db:seed");
});

// @ts-expect-error first parameter not detected correctly by ts
Cypress.on("uncaught:exception", (err) => {
  // Return false to prevent Cypress from failing the test
  // when a NEXT_REDIRECT error is encountered.
  if (err.message.includes("NEXT_REDIRECT")) {
    return false;
  }

  // Allow other uncaught exceptions to fail the test as usual.
  return true;
});
