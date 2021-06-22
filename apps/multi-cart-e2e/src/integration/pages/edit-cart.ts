/* eslint-disable cypress/no-unnecessary-waiting */
// ##################################################################################
// # EDIT CART tests
// ##################################################################################
context('Edit Cart Functionality', () => {

  // -------------------------------------
  // LOGIN and LOCALSTORAGE
  // -------------------------------------
  before(() => {
    cy.login('karlgolka', 'rsRKs39HbeaZLMJ#');
    cy.saveLocalStorage();
  });
  beforeEach(() => {
    cy.restoreLocalStorage()
  });



  // FYI:
  // • Tip: I recommend using the cy.contains command to find elements by text or by regular expression.
  //          cy.contains('main h1', 'About').should('be.visible');
  // I THINK I NEED THIS!:
  // 💎 https://github.com/abhinaba-ghosh/cypress-react-selector


  // ------------------------
  it('can add blank CART and navigate to it', () => {
    cy.addBlankCart();
  });

  // ------------------------
  it('can add blank cart LINES', () => {
    cy.visit('/dashboard');
    cy.addBlankCart();

    cy.findByTestId('btnAddCartLine').click();
    cy.get('tbody > tr').should('have.length', '2');

    cy.findByTestId('btnAddCartLine').click();
    cy.get('tbody > tr').should('have.length', '4');

    cy.findByTestId('btnAddCartLine').click();
    cy.get('tbody > tr').should('have.length', '6');

  });

  // ------------------------
  it('correctly SUMS LINE QUANTITIES in current cart avatar', () => {
    cy.visit('/dashboard');
    cy.addBlankCart();
    // NOTE: temporarily I hope, I need to click anywhere to hide the dropdown, because it messes things up
    cy.findByTestId('btnAddCartLine').click();
    cy.get('tbody > tr').should('have.length', '2');
    cy.findByTestId('btnAddCartLine').click();
    cy.get('tbody > tr').should('have.length', '4');
    cy.findByTestId('currentCartTotalItems').should('have.text', '2');

    // EXERCISE QUANTITY in avatar

    // start at first line input and tab way to first line quantity
    cy.findAllByTestId('inputQuantity').first().clear().type('4');
    cy.findByTestId('currentCartTotalItems').should('have.text', '5');


    // and enter some quantities on the 2nd line
    cy.findAllByTestId('inputQuantity').eq(1).clear().type('3');
    cy.findByTestId('currentCartTotalItems').should('have.text', '7');
  });

  // it('correctly sums line prices in current cart avatar', () => {
  //   cy.addBlankCart();
  //   cy.clickOutside(); // because already on edit page
  //   cy.findByTestId('btnAddCartLine').click().click();
  //   cy.get('tbody > tr').should('have.length', '2');
  //   cy.findByTestId('currentCartTotalCost').should('have.text', '0.00');

  //   // EXERCISE QUANTITY in avatar

  //   // start at first line input and tab way to first line price
  //   cy.get('input').first().focus().tab().tab().tab().tab().tab().type('3.18').as('lastFocused').tab();
  //   cy.wait(2000);
  //   cy.clickOutside().wait(1000);
  //   cy.findByTestId('currentCartTotalCost').should('have.text', '3.18');

  //   // and enter some prices on the 2nd line
  //   cy.get('@lastFocused').focus().tab().tab().tab().tab().tab().tab().tab().type('100.01').wait(1000);
  //   cy.findByTestId('currentCartTotalCost').should('have.text', '103.19');
  // });

  // it('autosave works correctly', () => {
  //   cy.addBlankCart();
  //   cy.clickOutside();
  //   cy.findByTestId('btnAddCartLine').click().click();
  //   cy.get('tbody > tr').should('have.length', '2');

  //   // 💪 EXERCISE ALL CART LINE FIELDS for auto-saving

  //   // line 1
  //   cy.get('input').first().focus().type('TestItem#1').as('lastFocused');
  //   cy.get('@lastFocused').focus().tab().type('TestDescription #1').as('lastFocused').wait(600);
  //   cy.get('@lastFocused').focus().tab().tab().tab().type('6').as('lastFocused').wait(600);
  //   cy.get('@lastFocused').focus().tab().type('1.99').as('lastFocused').wait(600);
  //   // line 2
  //   cy.get('@lastFocused').focus().tab().tab().type('TestItem#2').as('lastFocused').wait(600);
  //   cy.get('@lastFocused').focus().tab().type('TestDescription #2').as('lastFocused').wait(600);
  //   cy.get('@lastFocused').focus().tab().tab().tab().type('9').as('lastFocused').wait(600);
  //   cy.get('@lastFocused').focus().tab().type('9.49').as('lastFocused').wait(600);

  //   // check the math just in case
  //   cy.findByTestId('currentCartTotalCost').should('have.text', '97.35');
  //   cy.findByTestId('currentCartTotalItems').should('have.text', '15');

  //   // now how to reload or navigate away without losing the cookie?
  //   cy.reload();

  //   // ✅ CONFIRM SAVED VALUES:

  //   // line 1
  //   cy.get('input').first().should('have.value', 'TestItem#1').as('lastFocused');
  //   cy.get('@lastFocused').focus().tab().should('have.value', 'TestDescription #1').as('lastFocused');
  //   cy.get('@lastFocused').focus().tab().tab().tab().should('have.value', '6').as('lastFocused');
  //   cy.get('@lastFocused').focus().tab().should('have.value', '1.99').as('lastFocused');

  //   // line 2
  //   cy.get('@lastFocused').focus().tab().tab().should('have.value', 'TestItem#2').as('lastFocused');
  //   cy.get('@lastFocused').focus().tab().should('have.value', 'TestDescription #2').as('lastFocused');
  //   cy.get('@lastFocused').focus().tab().tab().tab().should('have.value', '9').as('lastFocused');
  //   cy.get('@lastFocused').focus().tab().should('have.value', '9.49').as('lastFocused');

  // });


});
