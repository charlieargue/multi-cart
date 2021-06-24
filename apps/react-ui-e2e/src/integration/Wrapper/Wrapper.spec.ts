describe('react-ui: Wrapper component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=wrapper--primary'));
    
    it('should render the component', () => {
      cy.get('#root').should('contain', 'All Good');
    });
});
