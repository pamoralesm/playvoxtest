/// <reference types="cypress" /> 

// Global variables
var url = 'http://demo.testim.io/'
var value1 = '';
var value2 = '';
var reqMsgName = 'Name is a required field.';
var reqMsgPass = 'Password is a required field.';

// LogIn negative and positive tests
context('LogIn', () => {
   beforeEach(() => {
     cy.visit(url)
     cy.get('.NavButton__nav-button___34wHC').click();
   })

   // Validating the madatory user name and password
    it('LogIn - mandatory fields validation', function(){
        
        cy.get('.Login__button-box___1OzjH > .theme__raised___ONZv6').click();
        
        value1 = cy.get(':nth-child(1) > .theme__error___3ilni');
        value2 = cy.get(':nth-child(2) > .theme__error___3ilni');

        value1.contains(reqMsgName); // Assertion for "required user" message 
        value2.contains(reqMsgPass); // Assertion for "required user" message

        cy.location('pathname').should('include', 'login'); // Assertion for the correct navigation

     }); 

   // Validating the madatory password when user is entered
    it('LogIn - empty password', function(){

        cy.get('#login > :nth-child(1) > .theme__inputElement___27dyY').type('MyUser');
        cy.get('.Login__button-box___1OzjH > .theme__raised___ONZv6').click();

        value2 = cy.get(':nth-child(2) > .theme__error___3ilni');
        value2.contains(reqMsgPass); // Assertion for "required user" message

        cy.location('pathname').should('include', 'login'); // Assertion for the correct navigation
   
     });

      // Validating the madatory user when password is entered
     it('LogIn - empty UserName', function(){
        
        cy.get('#login > :nth-child(2) > .theme__inputElement___27dyY').type('Password');
        cy.get('.Login__button-box___1OzjH > .theme__raised___ONZv6').click();

        value1 = cy.get(':nth-child(1) > .theme__error___3ilni');
        value1.contains(reqMsgName); // Assertion for "required user" message

        cy.location('pathname').should('include', 'login'); // Assertion for the correct navigation
     });

     // Validating cancel option
     it('LogIn - Cancel option', function(){

      cy.get('.Login__button-box___1OzjH > .theme__flat___2ui7t').click();

      var value1 = cy.location('pathname');
                   
      cy.location('pathname').should('eq', '/'); // Assertion for the correct navigation  
   });

   // Validating LogIn using valid user and password
   it('LogIn - Successful Login', function(){

      cy.get('#login > :nth-child(1) > .theme__inputElement___27dyY').type('MyUser');
      cy.get('#login > :nth-child(2) > .theme__inputElement___27dyY').type('Password');

      cy.get('.Login__button-box___1OzjH > .theme__raised___ONZv6').click();

      var value1 = cy.location('pathname');
                   
      cy.location('pathname').should('eq', '/'); // Assertion for the correct navigation
   });
});

// Main page tests 
context('Main page', () => {
   beforeEach(() => {
     cy.visit(url)
   })

   // Validating Destionation search selecting any option from Launch filter
    it('Destionation search by Launch', function(){
        
      cy.get(':nth-child(1) > .theme__input___qUQeP > .theme__inputElement___27dyY').click();
      cy.get('.theme__active___31xyK > .theme__values___1jS4g > :nth-child(4)').click();
      cy.get('.theme__values___1jS4g').find('li');

      cy.get(':nth-child(4) > .flexboxgrid__col-xs___1ROHR').first().contains('Tongli'); // Assertion for the correct search result
     });
});