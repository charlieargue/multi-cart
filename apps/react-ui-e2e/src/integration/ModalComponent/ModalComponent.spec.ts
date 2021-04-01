describe('react-ui: Modal component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=modalcomponent--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to react-ui!');
    });
});
