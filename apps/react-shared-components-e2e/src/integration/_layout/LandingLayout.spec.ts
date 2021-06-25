describe('react-shared-components: LandingLayout component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=landinglayout--primary'));
    
    it('should render the component', () => {
      // layout basics
      cy.get('#root').should('contain', '🛍');
      cy.get('#root').should('contain', 'multi');
      cy.get('#root').should('contain', 'cart');
      cy.get('#root').should('contain', 'Hello Landing Layout');
      cy.get('#root').should('contain', '© 2021 Karl Golka');
      cy.get('#root').should('contain', 'Privacy');    
      cy.get('#root').should('contain', 'Terms and Conditions');    
      
      
      // confirm dark mode works
      cy.findByTestId('darkModeSwitch').should('be.visible');
      cy.findByTestId('bkgndAppLayout').invoke('css', 'backgroundColor').should('contain', 'rgba(0, 0, 0, 0)'); // aka WHITE
      cy.findByTestId('darkModeSwitch').click().click(); // FIXED! needs double clicks
      cy.findByTestId('bkgndAppLayout').invoke('css', 'backgroundColor').should('contain', 'rgb(23, 25, 35)'); // AKA DARK!
      
    });
});
