export class ProductPage {


    addProduct(product) {
         cy.get('p').contains(product).siblings('button').contains('Add to cart').click();
    }
  
    closeModal(){
        cy.get('#closeModal').click();
    }
  
    clickShoppingCartButton(){
        cy.get('#goShoppingCart').click();
  
    }
  
  
  }