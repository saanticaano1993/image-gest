describe("Dashboard Test", () => {
  it("Loads dashboard successfully", () => {
    cy.visit("/");

    cy.get("h1").contains("Login");

    cy.get("#username").type("user_testing");
    cy.get("#password").type("12345678a");

    cy.get('button[type="submit"]').click();

    cy.get("h1").contains("Mis Imagenes");
  });
});
