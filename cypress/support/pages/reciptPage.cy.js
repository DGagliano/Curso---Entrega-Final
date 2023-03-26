export class ReciptPage {

    constructor(){
      this.name = '#name';
      this.creditCard = '#creditCard';
      this.totalPrice = '#totalPrice';
    }
    returnFullName(){
      const fullName = cy.get(this.name);
      return fullName;
  }
    returnProductName(product){
      const productName = cy.get(`p[id="${product}"]`).contains(product);
      return productName;
  }
    returnCreditNumber(){
    const creditNum = cy.get(this.creditCard);
    return creditNum;
  }
    returnTotalPrice(){
    const totalPrice = cy.get(this.totalPrice);
    return totalPrice;
    }
  
  }