describe('react-shared-components: LineAccountsContainer component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=lineaccountscontainer--with-default-state'));

  it('should render the component', () => {

    // should be two LineAccountsContainers
    cy.findAllByTestId('stackOneLineAccountsContainer').should('have.length', 2);


    // Match up line text
    // confirm container background colors (that's all, validators already done/checked)

    // ----------------------- LINE 1 - INVALID
    cy.findAllByTestId('stackOneLineAccountsContainer').eq(0).should('contain.text', 'Line Accounts');
    cy.findAllByTestId('stackOneLineAccountsContainer').eq(0).should('contain.text', 'Percentages:');
    cy.findAllByTestId('stackOneLineAccountsContainer').eq(0).should('contain.text', '80%');
    cy.findAllByTestId('stackOneLineAccountsContainer').eq(0).should('contain.text', 'Line Total w/ Tax:');
    cy.findAllByTestId('stackOneLineAccountsContainer').eq(0).should('contain.text', '$1.00');
    cy.findAllByTestId('stackOneLineAccountsContainer').eq(0).invoke('css', 'backgroundColor').should('equal', 'rgb(254, 215, 215)');


    // ----------------------- LINE 2
    cy.findAllByTestId('stackOneLineAccountsContainer').eq(1).should('contain.text', 'Line Accounts');
    cy.findAllByTestId('stackOneLineAccountsContainer').eq(1).should('contain.text', 'Percentages:');
    cy.findAllByTestId('stackOneLineAccountsContainer').eq(1).should('contain.text', '100%');
    cy.findAllByTestId('stackOneLineAccountsContainer').eq(1).should('contain.text', 'Line Total w/ Tax:');
    cy.findAllByTestId('stackOneLineAccountsContainer').eq(1).should('contain.text', '$0.75');
    cy.findAllByTestId('stackOneLineAccountsContainer').eq(1).invoke('css', 'backgroundColor').should('equal', 'rgb(240, 255, 244)');

    // confirm drawer hidden
    cy.get('body').should('not.contain', 'Search by account number or name');

    // clicking either Add account BUTTON opens drawer with search, etc...
    cy.findAllByTestId('btnAddLineAccount').should('have.length', 2);
    cy.findAllByTestId('btnAddLineAccount').eq(0).click();

    // confirm drawer open
    cy.get('body').should('contain', 'Search by account number or name');

    // closer drawer
    cy.get('.chakra-modal__close-btn').click();
    cy.get('body').should('not.contain', 'Search by account number or name');

    // click 2nd add line account BUTTON
    cy.findAllByTestId('btnAddLineAccount').eq(1).click();
    cy.get('body').should('contain', 'Search by account number or name');

    // closer drawer
    cy.get('.chakra-modal__close-btn').click();
    cy.get('body').should('not.contain', 'Search by account number or name');
  });
});
