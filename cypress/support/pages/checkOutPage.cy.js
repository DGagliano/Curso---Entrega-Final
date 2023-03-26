export class CheckOutPage {


    constructor(){
      this.firstName = '#FirstName';
      this.lastName = '#lastName';
      this.creditCard = '#cardNumber';
    }
  
    typeName(name) {
      cy.get(this.firstName).type(name);
  };
    typeLastName(lastname) {
      cy.get(this.lastName).type(lastname);
  };
    typeCreditCard(cardNumber) {
      cy.get(this.creditCard).type(cardNumber);
  };
    clickPurchase() {
      cy.get('button').contains('Purchase').click();
  };
  
  }