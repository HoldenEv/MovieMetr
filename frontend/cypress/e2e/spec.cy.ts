describe("Sign Up", () => {
  context("Unsuccessfull sign up", () => {
    /*
      Feature: Sign up
        Scenario: Unsuccessfull sign up
        GIVEN I navigate to the sign up page
        WHEN I enter an email and password that already exists
        THEN I should be alerted that this user already exists in the database
    */
    beforeEach(() => {});
    it("GIVEN I navigate to the sign up page", () => {});

    it("WHEN I enter username and email that already exists and submit the form\nTHEN I should be alerted that this user already exists in the database", () => {
      cy.visit("http://localhost:3000/signup");
      cy.intercept("POST", "http://localhost:3001/authentication/register", {
        statusCode: 409,
      }).as("addUser");
      cy.get("form").within(() => {
        cy.get('input[name="email"]').type("mockemail@test.com");
        cy.get('input[name="username"]').type("exampleusername");
        cy.get('input[name="password"]').type("ExamplePassword123");
        cy.get('input[name="confirmPassword"]').type("ExamplePassword123");
        cy.get('button[type="submit"]').click();
      });
      cy.wait("@addUser");
      cy.get("#errorMessage").should("be.visible");
      cy.get("#errorMessage").should(
        "contain.text",
        "Username or email already exists",
      );
    });

    /*
      Feature: Sign up
        Scenario: Unsuccessfull sign up
        GIVEN I navigate to the sign up page
        WHEN I enter an email and password that does not match the criteria
        THEN I should be alerted that the input does not meet the criteria
    */
    beforeEach(() => {});
    it("GIVEN I navigate to the sign up page", () => {});

    it("WHEN I enter username and email that already exists and submit the form\nTHEN I should be alerted that this user already exists in the database", () => {
      cy.visit("http://localhost:3000/signup");
      cy.intercept("POST", "http://localhost:3001/authentication/register", {
        statusCode: 409,
      }).as("addUser");
      cy.get("form").within(() => {
        cy.get('input[name="email"]').type("mockemail@test.com");
        cy.get('input[name="username"]').type("exampleusername");
        cy.get('input[name="password"]').type("ExamplePassword123");
        cy.get('input[name="confirmPassword"]').type("ExamplePassword123");
        cy.get('button[type="submit"]').click();
      });

      it("WHEN I enter username and email that already exists and submit the form\nTHEN I should be alerted that this user already exists in the database", () => {
        cy.visit("http://localhost:3000/signup");
        cy.get("form").within(() => {
          cy.get('input[name="email"]').type("mockemail@test.com");
          cy.get('input[name="username"]').type("exampleusername");
          cy.get('input[name="password"]').type("ExamplePassword123");
          cy.get('input[name="confirmPassword"]').type("ExamplePassword123");
          cy.get('button[type="submit"]').click();
        });
        cy.get(".passwordReq").within(() => {
          cy.get("li").eq(0).should("have.css", "color", "#eb7673");
          cy.get("li").eq(2).should("have.css", "color", "#eb7673");
          cy.get("li").eq(3).should("have.css", "color", "#eb7673");
        });
      });
    });
  });

  context("Successful sign up", () => {
    /*
      Feature: Sign up
        Scenario: Successfull sign up
        GIVEN I navigate to the sign up page
        WHEN I enter an email and password
        THEN I should be navigated to the login page
    */
    beforeEach(() => {});
    it("GIVEN I navigate to the sign up page", () => {});

    it("WHEN I enter username and email that already exists and submit the form\nTHEN I should be alerted that this user already exists in the database", () => {
      cy.visit("http://localhost:3000/signup");
      cy.intercept("POST", "http://localhost:3001/authentication/register", {
        statusCode: 200,
        body: {
          email: "mockemail@test.com",
          username: "exampleusername",
          password: "ExamplePassword123",
        },
      }).as("addUser");
      cy.get("form").within(() => {
        cy.get('input[name="email"]').type("mockemail@test.com");
        cy.get('input[name="username"]').type("exampleusername");
        cy.get('input[name="password"]').type("ExamplePassword123");
        cy.get('input[name="confirmPassword"]').type("ExamplePassword123");
        cy.get('button[type="submit"]').click();
      });
      cy.wait("@addUser");

      cy.url().should("include", "/login");
    });
  });
});
