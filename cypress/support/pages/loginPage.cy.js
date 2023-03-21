export class LoginPage {

    constructor(){
      this.usernameInput = '#user';
      this.passwordInput = '#pass';
      this.loginButton = 'Log in';
    }
   
    typeUsername(username) {
      cy.get(this.usernameInput).type(username);
  };
  
    typePassword(password) {
      cy.get(this.passwordInput).type(password);
  };
  
    clickLogIn() {
      cy.contains(this.loginButton).click();
  };
  }