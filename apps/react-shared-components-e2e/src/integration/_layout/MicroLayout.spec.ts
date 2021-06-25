describe('react-shared-components: MicroLayout component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=microlayout--primary'));
    
    it('should render the component', () => {
      
      // layout basics
      cy.get('#root').should('contain', '🛍');
      cy.get('#root').should('contain', 'multi');
      cy.get('#root').should('contain', 'cart');
      cy.get('#root').should('contain', 'Enter a New Password');
      cy.get('#root').should('contain', '🔐 And then login into your account again, please!');
      cy.get('#root').should('contain', 'Testing MicroLayout');    
      
      // confirm dark mode works
      cy.findByTestId('darkModeSwitch').should('be.visible');
      cy.findByTestId('bkgndAppLayout').invoke('css', 'backgroundColor').should('contain', 'rgba(0, 0, 0, 0)'); // aka TRANSPARENT
      cy.findByTestId('darkModeSwitch').click().click(); // FIXED! needs double clicks
      cy.findByTestId('bkgndAppLayout').invoke('css', 'backgroundColor').should('contain', 'rgb(23, 25, 35)'); // AKA DARK!

      // and toggle back just for fun just this once
      cy.findByTestId('darkModeSwitch').click(); // ATTN: just one click this time???
      // ATTN: and different color, not just transparent but the GRAY explicitly!!!
      cy.findByTestId('bkgndAppLayout').invoke('css', 'backgroundColor').should('contain', 'rgb(247, 250, 252)'); // aka GRAY
      
    });
});
