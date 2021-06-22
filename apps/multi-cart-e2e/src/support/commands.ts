// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// ##################################################################################
// # TYPES:
// ##################################################################################
// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(email: string, password: string): Cypress.Chainable<void>;
    showCarts(): Cypress.Chainable<void>;
    addBlankCart(): Cypress.Chainable<void>;
    clickOutside(): Cypress.Chainable<void>;
    confirmSaved(): Cypress.Chainable<void>;
  }
}

// ------------------------
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('#usernameOrEmail').type(email);
  cy.get('#password').type(password);
  cy.findByText('Login').click();
  cy.contains('Welcome back!');
  cy.findByTestId('btnMyCarts').should("exist");
});

// ------------------------
Cypress.Commands.add('showCarts', () => {
  cy.findByTestId('btnMyCarts').click();
});

// ------------------------
Cypress.Commands.add('addBlankCart', () => {
  cy.showCarts();
  cy.findByTestId('btnNewCart').click();
  cy.location('pathname').should('include', '/cart/');
});

// ------------------------
Cypress.Commands.add('clickOutside', function (): Cypress.Chainable<any> {
  return cy.get('body').click(0, 0); //0,0 here are the x and y coordinates
});


// ------------------------
Cypress.Commands.add('confirmSaved', () => {
  cy.findByTestId('fetchingStatus').invoke('attr', 'data-value').should('eq', 'fetching');
  cy.findByTestId('fetchingStatus').invoke('attr', 'data-value').should('eq', '');
});