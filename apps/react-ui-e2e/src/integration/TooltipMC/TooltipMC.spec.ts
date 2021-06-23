describe('react-ui: TooltipMC component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=tooltipmc--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to react-ui!');
    });
});
