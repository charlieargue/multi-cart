describe('react-ui: InputField component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=inputfield--primary&knob-label=Success'));
    
    it('should render the component', () => {
      cy.get('body').should('contain', 'Success');
    });
});
