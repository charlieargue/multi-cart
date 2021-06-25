/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductsMockData as products } from '@multi-cart/mock-api';

describe('react-shared-components: ProductDetails component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=productdetails--primary'));

  it('should render the component', () => {

    // confirm everything displayed as expected
    cy.get('#root').should('contain', (products[3] as any).slug);
    cy.get('#root').should('contain', (products[3] as any).name);
    cy.get('#root').should('contain', (products[3] as any).description);
    cy.get('#root').should('contain', (products[3] as any).price);

    // and that the add to cart button is present
    cy.get('#root').find('a.chakra-button').should('have.length', 1);
    cy.get('#root').find('a.chakra-button').should('contain.text', 'Add to Cart');


  });
});
