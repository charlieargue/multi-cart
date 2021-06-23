describe('react-ui: TextMuted component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=textmuted--primary&knob-children&knob-style&knob-fontSize='));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to react-ui!');
    });
});
