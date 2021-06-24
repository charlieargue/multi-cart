describe('react-ui: InputField component', () => {
  
    
    it('should render the component with DEFAULT STATE', () => {
      cy.visit('/iframe.html?id=inputfield--with-default-state&knob-label=StoryBook+Cypress')
      cy.get('#root').should('contain', 'StoryBook Cypress');
    });
    
    it('should render the component with SECONDARY STATE', () => {
      cy.visit('/iframe.html?id=inputfield--with-secondary&knob-label=SecondaryState')
      cy.get('#root').should('contain', 'SecondaryState');
    });
});
