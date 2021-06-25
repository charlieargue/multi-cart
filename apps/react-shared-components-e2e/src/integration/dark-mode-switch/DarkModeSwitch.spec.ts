describe('react-shared-components: DarkModeSwitch component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=darkmodeswitch--primary'));
    

  // NOTE: known issue cannot click Switch: https://github.com/chakra-ui/chakra-ui/issues/3955
  // because of aria-label covering afaik
    it('should render the component', () => {
      cy.findByTestId('darkModeSwitch').should('be.visible');
      cy.get('.chakra-switch__track').invoke('css', 'backgroundColor').should('contain', 'rgb(203, 213, 224)');
      cy.findByTestId('darkModeSwitch').click().click(); // FIXED! needs double clicks
      cy.get('.chakra-switch__track').invoke('css', 'backgroundColor').should('contain', 'rgb(251, 182, 206)');
    });
});
