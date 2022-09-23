
/// <reference types="cypress" /> 

// Global variables
var urlHost = 'https://api.thecatapi.com/v1/'
var response = {};
var getResp = {};

context('API Test', () => {

   // Creating a vote 
    it('Post vote to CatAPI', function() {
        
      cy.request({
        method: 'POST',
        url: urlHost+'votes', // baseUrl is prepend to URL
        body: {
            image_id: "asf2",
            sub_id: "my-user-1234",
            value: 10
          },
        headers: 
          { 'x-api-key': 'DEMO-API-KEY',
            'content-type': 'application/json' 
          }
      }).then(resp => {
        response = resp;
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
        expect(response.body.id).to.exist;
        expect(response.body.message).to.equal('SUCCESS') ;       
      });
      
     });

     // Consulting a submitted vote 
    it('Get vote from CatAPI', function() {
        
        cy.request({
          method: 'GET',
          url: urlHost+'votes/'+response.body.id, // baseUrl is prepend to URL
          headers: 
            { 'x-api-key': 'DEMO-API-KEY',
              'content-type': 'application/json' 
            }
        }).then(resp => {
          getResp = resp;
          expect(getResp.status).to.eq(200);
          expect(getResp.body.id).to.eq(response.body.id);
          expect(getResp.body.value).to.eq(response.body.value);
          expect(getResp.body.user_id).to.exist;
                 
        });
        
       });

});