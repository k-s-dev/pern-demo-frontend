import { routes } from "../../../src/lib/routes";

describe("SignIn flow", () => {
  it("should navigate to the Sign in page", () => {
    cy.visit(routes.auth.signIn);
    cy.document().its("readyState").should("eq", "complete");
    cy.location("pathname").should("eq", `${routes.auth.signIn}`);
  });

  it("should signIn verfified user", () => {
    cy.visit(routes.auth.signIn);
    cy.confirmSignIn("test-user-01@example.com", "12345678@Ab");
    cy.location("pathname").should("eq", routes.DEFAULT_SIGNIN_REDIRECT);
  });

  it("should not signIn unverifified user", () => {
    cy.visit(routes.auth.signIn);
    cy.getByData("signIn-email").type("test-user-03@example.com");
    cy.getByData("signIn-password").type("12345678@Ab");
    cy.getByData("signIn-btn").click();
    cy.location("pathname").should("eq", routes.auth.signIn);
    cy.getByData("form-error-item").eq(0).should("be.visible");
  });
});
