import { routes } from "../../src/lib/routes";

Cypress.Commands.add("getByData", (selector, ...args) => {
  return cy.get(`[data-test-cy=${selector}]`, ...args);
});

Cypress.Commands.add("confirmSignIn", (email, password) => {
  cy.visit(routes.auth.signIn);
  cy.getByData("signIn-email").type(email);
  cy.getByData("signIn-password").type(password);
  cy.getByData("signIn-btn").click();
  cy.intercept("POST", "api/auth/sign-in/email").as("signInRequest");
  cy.intercept("GET", "api/auth/get-session").as("sessionRequest");
  cy.wait(1000);
  cy.getByData("nav-user-avatar").should("be.visible");
});
