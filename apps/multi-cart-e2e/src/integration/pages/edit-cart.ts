/* eslint-disable cypress/no-unnecessary-waiting */
// ##################################################################################
// # EDIT CART tests
// ##################################################################################
context('Edit Cart Functionality', () => {

  // TODO:
  // try these two instead of .wait() and .tab() after typing inputs:
  // * cy.get('.action-email').type('fake@email.com').should('have.value', 'fake@email.com')
  // * Delay each keypress by 0.1 sec
  //    .type('slow.typing@email.com', { delay: 100 })
  //    .should('have.value', 'slow.typing@email.com')

  // AND do I need to always:
  // .focus().should('have.class', 'focus')


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

  // -------------------------------------
  // CLEAN-UP
  // -------------------------------------
  after(() => {
    cy.visit('/dashboard');
    cy.showCarts();

    // need to loop as many times as there are carts
    cy.findByTestId('myCarts').find('a').then(elm => {
      const genArr = Array(elm.length);
      console.log(`🚀 ~ genArr`, genArr);

      // now do that many loops and run our flow
      cy.wrap(genArr).each(() => {

        // grab each cart list row and the first cart
        cy.findByTestId('myCarts').find('a').first().click();
        cy.findByTestId('btnDeleteCart').should('not.be.disabled');
        cy.findByTestId('btnDeleteCart').click({ force: true });

        // confirm deleted toast
        // <div class=" css-tidvy5">Deleted!</div>
        cy.get('.chakra-alert__title').should('contain', 'Deleted');
        cy.contains('Welcome back!');
        cy.showCarts();
        cy.wait(1000);

      });
    });


    // then confirm no more carts! (because message is visible, you have no carts)
    cy.contains('You have no carts');


  });

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
    cy.findAllByTestId('inputQuantity').first().focus().clear().type('4', { delay: 2000 }).tab();
    cy.findAllByTestId('inputQuantity').first().focus().clear().type('4', { delay: 2000 }).tab(); // hacky: was NOT saving damnit! needed to do it twice wtf
    cy.findAllByTestId('inputQuantity').first().should('have.value', '4'); // NOTE: was super flaky, and needed the tab after!
    cy.confirmNotSaving();
    cy.findByTestId('currentCartTotalItems').should('have.text', '5');


    // and enter some quantities on the 2nd line
    cy.findAllByTestId('inputQuantity').eq(1).clear().focus().type('3', { delay: 1000 }).should('have.value', '3');
    cy.confirmNotSaving();
    cy.findByTestId('currentCartTotalItems').should('have.text', '7');
  });

  // ------------------------
  it('correctly SUMS LINE PRICES in current cart avatar', () => {
    cy.visit('/dashboard');
    cy.addBlankCart();
    cy.findByTestId('btnAddCartLine').click();
    cy.get('tbody > tr').should('have.length', '2');
    cy.findByTestId('btnAddCartLine').click();
    cy.get('tbody > tr').should('have.length', '4');
    cy.findByTestId('currentCartTotalCost').should('have.text', '0.00');

    // EXERCISE PRICES in avatar

    // start at first line input and tab way to first line price
    cy.findAllByTestId('inputQuantity').first().tab().clear().focus().type('3.18', { delay: 1000 }).should('have.value', '3.18');
    cy.confirmNotSaving();
    cy.findByTestId('currentCartTotalCost').should('have.text', '3.18');

    // and enter some prices on the 2nd line
    cy.findAllByTestId('inputQuantity').eq(1).tab().focus().type('100.01', { delay: 1000 }).should('have.value', '100.01');
    cy.confirmNotSaving();
    cy.findByTestId('currentCartTotalCost').should('have.text', '103.19');
  });

  // ------------------------
  it('autosave works correctly', () => {
    cy.visit('/dashboard');
    cy.addBlankCart();

    cy.findByTestId('btnAddCartLine').click();
    cy.get('tbody > tr').should('have.length', '2');
    cy.findByTestId('btnAddCartLine').click();
    cy.get('tbody > tr').should('have.length', '4');

    // 💪 EXERCISE ALL CART LINE FIELDS for auto-saving

    // line 1
    cy.get('input').first().focus().type('TestItem#1').as('lastFocused');
    cy.get('@lastFocused').focus().tab().type('TestDescription #1').as('lastFocused').wait(800);
    cy.get('@lastFocused').focus().tab().tab().tab().type('6').as('lastFocused').wait(800);
    cy.get('@lastFocused').focus().tab().type('1.99').as('lastFocused').wait(800);


    // line 2
    cy.get('@lastFocused').focus().tab().tab().tab().type('TestItem#2').as('lastFocused').wait(800);
    cy.get('@lastFocused').focus().tab().type('TestDescription #2').wait(1200).as('lastFocused');
    cy.get('@lastFocused').focus().tab().tab().tab().type('9').as('lastFocused').wait(800);
    cy.get('@lastFocused').focus().tab().type('9.49').as('lastFocused').wait(800);

    // check the math just in case
    cy.findByTestId('currentCartTotalCost').should('have.text', '97.35');
    cy.findByTestId('currentCartTotalItems').should('have.text', '15');

    cy.reload();

    // ✅ CONFIRM SAVED VALUES:

    // line 1
    cy.confirmSaved();
    cy.get('input').first().should('have.value', 'TestItem#1').as('lastFocused');
    cy.get('@lastFocused').focus().tab().should('have.value', 'TestDescription #1').as('lastFocused');
    cy.get('@lastFocused').focus().tab().tab().tab().should('have.value', '6').as('lastFocused');
    cy.get('@lastFocused').focus().tab().should('have.value', '1.99').as('lastFocused');

    // line 2
    cy.get('@lastFocused').focus().tab().tab().tab().should('have.value', 'TestItem#2').as('lastFocused');
    cy.get('@lastFocused').focus().tab().should('have.value', 'TestDescription #2').as('lastFocused');
    cy.get('@lastFocused').focus().tab().tab().tab().should('have.value', '9').as('lastFocused');
    cy.get('@lastFocused').focus().tab().should('have.value', '9.49').as('lastFocused');

  });


});
