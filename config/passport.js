//we import passport packages required for authentication
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

//We will need the models folder to check passport agains
var db = require("../models");

// Telling passport we want to use a Local Strategy. 
passport.use(new LocalStrategy (
    {
        usernameField: "email"
    },
    function(email, password, done) {
        //When user tries to sign in 
        db.User.findOne({
            where: {
                email: email  
            }
        }).then(function(dbUser) {
            //If there is no user with that given email 
            if(!dbUser) {
                return done(null, false, {
                    message: "Incorrect email."
                });
            }
            //if user with given email but incorrect password
            else if (!dbUser.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password."
                });
            }
            //if non of above return user
            return done(null, dbUser);
        });
    }
));
//initialize passport-local strategy and the user model
//serialize passport   creates the cookie in order to help keep authen across HTTP requests 
passport.serializeUser(function(user, cb) {
     cb(null, user);
});

// used to deserialize the user -reads the cookie -ex. take the attribute you defined ex username.id and look up user returning as object 
//allowing you to use ex  request.user and have ability to work and modify user
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

module.exports = passport;