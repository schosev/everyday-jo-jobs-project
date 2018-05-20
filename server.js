var express = require("express");
var bodyParser = require("body-parser");
var path = require("path")
var session = require("express-session"); //added for authen
//Requiring passport 
var passport = require("./config/passport");
// Sets up the Express App
// =============================================================
var app = express();
//added for authen
//var user = require;
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing

var db = require("./models");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory to be served
app.use(express.static("public"));

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
// Starts the server to begin listening
// =============================================================
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
