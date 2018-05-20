var connection = require("../config/connection.js");
var path = require("path")
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../views/main.html"));
      });
  
      app.get("/profile", function(req, res) {
        res.sendFile(path.join(__dirname, "../views/profile.html"));
      });

      app.get("/signup", function(req, res) {
        res.sendFile(path.join(__dirname, "../views/signup.html"));
      });
      //ADDED AUTHEN ROUTES 
      app.get("/", function(req, res) {
      //if the user already has an account after login send them to profile
      //if not send them to sign up  
       if(req.user) {
         res.redirect("/profile");
      } else {
    
        res.sendFile(path.join(__dirname, "../views/signup.html"));
      }
      });

      app.get("/", function(req, res) {
      //if the user already has an account after login them to profile  page otherwise send them to login which is on main page
      if(req.user) {
        res.redirect("/profile");
      }
      res.sendFile(path.join(__dirname, "../views/main.html"));
      });


      // isAuthenticated middleware added to route
      // If a user who is not logged in tries to access this route they will be 
      //redirected to the signup page
      app.get("/profile", isAuthenticated, function(req, res) {
          res.sendFile(path.join(__dirname, "../views/signup.html"));
      
      //   // app.post('/signup', passport.authenticate('local-signup',  { successRedirect: '/signin',
      //   // failureRedirect: '/signup'}
      //   // ));

      //   //option to pass to log them in 



      });      
};
  
  