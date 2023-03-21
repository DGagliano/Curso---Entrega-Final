import { RegisterPage } from "../support/pages/registerPage.cy";
import { ShoppingCartPage } from "../support/pages/shoppingCartPage.cy";
import { OnlineShopPage } from "../support/pages/onlineShop.cy";
import { LoginPage } from "../support/pages/loginPage.cy";
import { HomePage } from "../support/pages/homePage.cy";

describe("Page objet Model", () => {
  let loginData;
  let fixtureProducts;
  const registerPage = new RegisterPage();
  const loginPage = new LoginPage();
  const homePage = new HomePage();
  const onlinePage = new OnlineShopPage();
  const shoppingCartPage = new ShoppingCartPage();

  before("Before", () => {
    cy.fixture("loginFixture").then((data) => {
      loginData = data;
    });
    cy.fixture("productsFixture").then((data) => {
      fixtureProducts = data;
    });
  });

  it("Test", () => {
    cy.visit("");
    registerPage.dblClickIniciaSesion();
    loginPage.typeUsername(loginData.test.loginData.user);
    loginPage.typePassword(loginData.test.loginData.password);
    loginPage.clickLogIn();
    homePage.clickOnlineShop();
    onlinePage.addProduct(fixtureProducts.Product1.nameProduct);
    onlinePage.closeModal();
    onlinePage.addProduct(fixtureProducts.Product2.nameProduct);
    onlinePage.closeModal();
    onlinePage.clickShoppingCartButton();
    shoppingCartPage.returnProductName(fixtureProducts.Product1.nameProduct).should('have.text', `${fixtureProducts.Product1.nameProduct}`);
    shoppingCartPage.returnProductName(fixtureProducts.Product2.nameProduct).should('have.text', `${fixtureProducts.Product2.nameProduct}`);
    shoppingCartPage.returnProductPrice(fixtureProducts.Product1.nameProduct).should('have.text', `$${fixtureProducts.Product1.priceProduct}`); 
    shoppingCartPage.returnProductPrice(fixtureProducts.Product2.nameProduct).should('have.text', `$${fixtureProducts.Product2.priceProduct}`); 
    shoppingCartPage.clickShowTotalPrice();   
    shoppingCartPage.returnTotalPrice().should('have.text', `${fixtureProducts.Product1.priceProduct + fixtureProducts.Product2.priceProduct}`);
                  
  });
});
