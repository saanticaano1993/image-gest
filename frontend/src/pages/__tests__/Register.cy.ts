describe('Registration Test', () => {
  it('Registers successfully', () => {
    cy.visit('/register');

    cy.get('h1').contains('Register');

    cy.get('#username').type('TestNew14');
    cy.get('#email').type('test-profle14@test.com');
    cy.get('#password').type('Password@123');

    cy.get('button[type="submit"]').click();

    cy.get('.Toastify__toast-body').contains('User created successfully');
  });
});