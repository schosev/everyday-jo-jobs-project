var Nightmare = require("nightmare");
var expect = require("chai").expect;

describe("Login", function() {
  // The default tests in mocha is 2 seconds.
  // Extending it to 20 seconds to have time to load the pages
  // Also added a few 2-3 second waits so you can see the screens better

  this.timeout(20000);

  it("should sign in and go to the main page", function(done) {
    new Nightmare({ show: true })
      .goto("https://everyday-jo-jobs.herokuapp.com/")
      // Enter username.
      .wait("#modal-password")
      .wait(2000)
      .type("#modal-email", "test@test.com")
      // Enter password.
      .type("#modal-password", "dummy*password")
      // Click the login button
      .click("#modal-submit")
      // Evaluate the following selector
      .wait("#sign-out")
      .wait(3000)
      
      .evaluate(function() {
        return document.title;
      })
      .end()
      .then(function(title) {
        expect(title).to.equal("Everyday Jo Jobs");
        done();
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  it("should go to the sign up page and get nav bar title", function(done) {
    new Nightmare({ show: true })
      .goto("https://everyday-jo-jobs.herokuapp.com/")
      // Click the sign up button
      .wait("#modal-sign-up")
      .click("#modal-sign-up")
      .wait("#signup-title")
      .wait(3000)
      .evaluate(function() {
        return document.title;
      })
      .end()
      .then(function(title) {
        expect(title).to.equal("Everyday Jo Jobs");
        done();
      })
      .catch(function(err) {
        console.log(err);
      })
  });

  it("should go to the sign up page, click submit and get an error", function(done) {
    new Nightmare({ show: true })
      .goto("https://everyday-jo-jobs.herokuapp.com/")
      // Click the sign up button
      .wait("#modal-sign-up")
      .click("#modal-sign-up")
      .wait("#signup-title")
      .type("#signup-email", "test1@test.com")
      .type("#signup-password", "testPassword")
      .type("#signup-name", "John Smith")
      .type("#signup-phone", "816-123-4567")
      .type("#inputCity", "KC")
      .type("#inputState", "MO")
      .type("#inputUrl", "testurl")
      .select('.skillOne', "Babysitting")
      .type("#wageOne", 1)
      .select('.skillTwo', "Car Washing")
      .type("#wageTwo", 12)
      .click("#signup-submit")
      .wait("#error-modal-title")
      .wait(3000)
      .evaluate(function() {
        return document.getElementById("error-modal-title").innerText;
      })
      .end()
      .then(function(errorTitle) {
        expect(errorTitle).to.equal("Error");
          done();
      })
  })

  it("should go to the sign up page, click submit and add the user", function(done) {
    new Nightmare({ show: true })
      .goto("https://everyday-jo-jobs.herokuapp.com/")
      // Click the sign up button
      .wait("#modal-sign-up")
      .click("#modal-sign-up")
      .wait("#signup-title")
      .type("#signup-email", "joseph@gmail.com")
      .type("#signup-password", "testPassword")
      .type("#signup-name", "Joseph Hobbs")
      .type("#signup-phone", "8167164567")
      .type("#inputCity", "Lee Summit")
      .type("#inputState", "MO")
      .type("#inputUrl", "testurl")
      .select('.skillOne', "Car Detailing")
      .type("#wageOne", 10)
      .select('.skillTwo', "Car Washing")
      .type("#wageTwo", 12)
      .select('.skillThree', "Lawn Care")
      .type("#wageThree", 15)
      .click("#signup-submit")
      .wait("#sign-out")
      .wait(3000)
      .evaluate(function() {
        return document.getElementById("sign-out").innerText;
      })
      .end()
      .then(function(headerRowItem) {
        expect(headerRowItem).to.equal("Sign Out");
          done();
      })
  })

});