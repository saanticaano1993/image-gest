describe('Login Test', () => {
  it('Logs in successfully', () => {
    cy.visit('/');

    cy.get('h1').contains('Login');

    cy.get('#username').type('user_testing');
    cy.get('#password').type('12345678a');

    cy.get('button[type="submit"]').click();

    cy.get('h1').contains('Mis Imagenes');
  });
});
