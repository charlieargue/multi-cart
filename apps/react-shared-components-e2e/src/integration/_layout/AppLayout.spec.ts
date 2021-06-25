describe('react-shared-components: AppLayout component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=applayout--primary'));
    
    it('should render the component', () => {
      // layout basics
      cy.get('#root').should('contain', '🛍');
      cy.get('#root').should('contain', 'multi');
      cy.get('#root').should('contain', 'cart');
      cy.get('#root').should('contain', 'Testing');
      cy.findByTestId('btnUserProfile').should('be.visible');
      cy.findByTestId('bkgndAppLayout').should('be.visible');
      
      // confirm dark mode works
      cy.findByTestId('darkModeSwitch').should('be.visible');
      cy.findByTestId('bkgndAppLayout').invoke('css', 'backgroundColor').should('contain', 'rgba(0, 0, 0, 0)'); // aka WHITE
      cy.findByTestId('darkModeSwitch').click().click(); // FIXED! needs double clicks
      cy.findByTestId('bkgndAppLayout').invoke('css', 'backgroundColor').should('contain', 'rgb(23, 25, 35)'); // AKA DARK!
      
    });
});
