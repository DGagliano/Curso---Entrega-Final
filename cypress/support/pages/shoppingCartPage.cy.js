export class ShoppingCartPage {
  
    clickShowTotalPrice() {
        cy.get('button').contains('Show total price').click();
    }
  
    returnProductPrice(product){
        const productPrice = cy.get('p').contains(product).siblings('p#productPrice');
        return productPrice
    }
  
    returnTotalPrice(){
        return cy.get('#price');
    }

    
    returnProductName(product){
          const productName = cy.get('p#productName').contains(product);
          return productName
      }
      
      clickCheckOut(){
        cy.get('button').contains('Go to Checkout').click();
      }  
  }

 