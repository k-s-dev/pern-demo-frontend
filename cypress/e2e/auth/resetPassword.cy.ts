import { routes } from "../../../src/lib/routes";

describe("Reset password flow", () => {
  it("should reset password for valid user", () => {
    cy.visit(routes.auth.signIn);
    cy.getByData("signIn-email").type("test-user-01@example.com");
    cy.getByData("reset_password-btn").click();
    cy.getByData("form-message-item")
      .eq(0)
      .should("contain", "check your email for the reset link");
  });
});
