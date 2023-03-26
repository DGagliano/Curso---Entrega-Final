import { ShoppingCartPage } from "../support/pages/shoppingCartPage.cy";
import { ProductPage } from "../support/pages/productPage.cy";
import { HomePage } from "../support/pages/homePage.cy";
import { ReciptPage } from "../support/pages/reciptPage.cy";
import { CheckOutPage } from "../support/pages/checkOutPage.cy";

describe("Page objet Model", () => {
  let creditFixture;
  let fixtureProducts;

  const homePage = new HomePage();
  const productPage = new ProductPage();
  const shoppingCartPage = new ShoppingCartPage();
  const reciptPage = new ReciptPage();
  const checkOutPage = new CheckOutPage();

  const user = "Diego16";
  const pass = "123456!";
  const gender = "Male";
  const day = "16";
  const month = "September";
  const year = "1989";

  let tokenAPI;
  let userAPI;

  before("Before", () => {
    cy.fixture("productsFixture").then((data) => {
      fixtureProducts = data;
    });
    cy.fixture("creditFixture").then((data) => {
      creditFixture = data;
    });
  });

  after("after", () => {
    cy.request({
      url: `https://pushing-it.onrender.com/api/deleteuser/${user}`,
      method: "DELETE",
    }).then((res) => {
      expect(res.status).equal(200);
    });
  });

  it("Test", () => {
    cy.request({
      url: "https://pushing-it.onrender.com/api/register",
      method: "POST",
      body: {
        username: user,
        password: pass,
        gender: gender,
        day: day,
        month: month,
        year: year,
      },
    }).then((res) => {
      expect(res.status).equal(200);
      cy.request({
        url: "https://pushing-it.onrender.com/api/login",
        method: "POST",
        body: {
          username: user,
          password: pass,
        },
      }).then((res) => {
        expect(res.status).equal(200);
        tokenAPI = res.body.token;
        userAPI = res.body.user.username;
      });
    });

    window.localStorage.setItem("token", tokenAPI);
    window.localStorage.setItem("user", userAPI);
    cy.visit("");
    homePage.clickOnlineShop();
    productPage.addProduct(fixtureProducts.Product1.nameProduct);
    productPage.closeModal();
    productPage.addProduct(fixtureProducts.Product2.nameProduct);
    productPage.closeModal();
    productPage.clickShoppingCartButton();
    shoppingCartPage
      .returnProductName(fixtureProducts.Product1.nameProduct)
      .should("have.text", `${fixtureProducts.Product1.nameProduct}`);
    shoppingCartPage
      .returnProductName(fixtureProducts.Product2.nameProduct)
      .should("have.text", `${fixtureProducts.Product2.nameProduct}`);
    shoppingCartPage
      .returnProductPrice(fixtureProducts.Product1.nameProduct)
      .should("have.text", `$${fixtureProducts.Product1.priceProduct}`);
    shoppingCartPage
      .returnProductPrice(fixtureProducts.Product2.nameProduct)
      .should("have.text", `$${fixtureProducts.Product2.priceProduct}`);
    shoppingCartPage.clickShowTotalPrice();
    shoppingCartPage
      .returnTotalPrice()
      .should(
        "have.text",
        `${
          fixtureProducts.Product1.priceProduct +
          fixtureProducts.Product2.priceProduct
        }`
      );
    shoppingCartPage.clickCheckOut();  
    checkOutPage.typeName(creditFixture.firstName);
    checkOutPage.typeLastName(creditFixture.lastName);
    checkOutPage.typeCreditCard(creditFixture.creditNumber);
    checkOutPage.clickPurchase();
    cy.timeDiegoOut();
    reciptPage
      .returnFullName()
      .should(
        "have.text",
        `${creditFixture.firstName} ${creditFixture.lastName} has succesfully purchased the following items`
      );
      reciptPage
      .returnProductName(fixtureProducts.Product1.nameProduct)
      .should("have.text", `${fixtureProducts.Product1.nameProduct}`);
      reciptPage
      .returnProductName(fixtureProducts.Product2.nameProduct)
      .should("have.text", `${fixtureProducts.Product2.nameProduct}`);
      reciptPage
      .returnCreditNumber()
      .should("have.text", `${creditFixture.creditNumber}`);
      reciptPage
      .returnTotalPrice()
      .should(
        "have.text",
        `You have spent $${
          fixtureProducts.Product1.priceProduct +
          fixtureProducts.Product2.priceProduct
        }`
      );
  });
});
