// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(email: string, password: string): Cypress.Chainable<void>;
    showCarts(): Cypress.Chainable<void>;
    addBlankCart(): Cypress.Chainable<void>;
    clickOutside(): Cypress.Chainable<void>;
  }
}


//
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('#usernameOrEmail').type(email);
  cy.get('#password').type(password);
  (cy as any).findByText('Login').click();
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(2000); // must wait for carts query to complete so btn has carts behind it!
  cy.contains('Dashboard');
});

Cypress.Commands.add('showCarts', () => {
  (cy as any).findByTestId('btnMyCarts').click();
});

Cypress.Commands.add('addBlankCart', () => {
  (cy as any).findByTestId('btnMyCarts').click();
  (cy as any).findByTestId('btnNewCart').click();
  cy.location('pathname').should('include', '/cart/');
});

Cypress.Commands.add('clickOutside', function (): Cypress.Chainable<any> {
  return cy.get('body').click(0, 0); //0,0 here are the x and y coordinates
});


// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
