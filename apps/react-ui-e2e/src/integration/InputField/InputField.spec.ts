describe('react-ui: InputField component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=inputfield--withLabel&knob-label=Success'));
    
    it('should render the component', () => {
      cy.get('input').should('contain', 'Success');
    });
});
