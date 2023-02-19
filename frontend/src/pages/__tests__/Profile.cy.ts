describe("Changing Profile data", () => {
  it("Changes the profile data successfully", () => {
    cy.visit("/");

    cy.get("h1").contains("Login");

    cy.get("#username").type("user_testing");
    cy.get("#password").type("12345678a");

    cy.get('button[type="submit"]').click();

    cy.get("h1").contains("Mis Imagenes");

    cy.get("a").contains("Perfil").click();

    cy.get("h1").contains("Perfil");

    cy.get("#username").clear().type("Test_10_");
    cy.get("#password").clear().type("12345678a");

    cy.get('button[type="submit"]').contains("Actualizar Username").click();

    cy.get(".Toastify__toast-body").contains(
      "Successfully updated your username."
    );

    cy.wait(1000);

    cy.get("#username").clear().type("user_testing");
    cy.get("#password").clear().type("12345678a");

    cy.get('button[type="submit"]').contains("Actualizar Username").click();

    cy.get(".Toastify__toast-body").contains(
      "Successfully updated your username."
    );

    cy.wait(1000);

    cy.get("#oldPassword").type("12345678a");
    cy.get("#newPassword").type("Password@321");
    cy.get("#confirmPassword").type("Password@321");

    cy.get('button[type="submit"]').contains("Actualizar Contraseña").click();

    cy.get(".Toastify__toast-body").contains(
      "Contraseña actualizada correctamente"
    );

    cy.wait(1000);

    cy.get("#oldPassword").clear().type("Password@321");
    cy.get("#newPassword").clear().type("12345678a");
    cy.get("#confirmPassword").clear().type("12345678a");

    cy.get('button[type="submit"]').contains("Actualizar Contraseña").click();

    cy.get(".Toastify__toast-body").contains(
      "Contraseña actualizada correctamente"
    );

    cy.wait(1000);

    // cy.wait(1000);

    // // logout
    // cy.get('button').contains('Logout').click();
  });
});
