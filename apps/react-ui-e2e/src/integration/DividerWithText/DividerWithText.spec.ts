describe('react-ui: DividerWithText component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=dividerwithtext--primary'));
    
    it('should render the component', () => {
      cy.get('#root').should('contain', 'coming soon');
    });
});
