//we import passport packages required for authentication
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
//
//We will need the models folder to check passport agains
var db = require("../models");
//
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     db.Users.findOne({ 
//       where: {username: username }}, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));



// Telling passport we want to use a Local Strategy. In other words,
//we want login with a username/email and password
passport.use(new LocalStrategy(
//   // Our user will sign in using an email, rather than a "username"
//   // {
//   //   usernameField: "username"
//   // },
  function(username, password, done) {
//     // When a user tries to sign in this code runs
    db.Users.findOne({
      where: {
        username: username
      }
    }).then(function(dbUser) {
//       // If there's no user with the given username
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect username."
        });
      }

//       // If there is a user with the given username, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
//       // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));
//
// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});
//
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
//
// Exporting our configured passport
module.exports = passport;