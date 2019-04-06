var db = require("../models");
//var passport = require('passport');
// var path = require("path");
// module.exports = function(app) {
//   // Load index page
//   // app.get("/", function(req, res) {
//   //   db.sellOffers.findAll({}).then(function(dbExamples) {
//   //     res.render("index", {
//   //       msg: "Welcome!",
//   //       examples: dbExamples
//   //     });
//   //   });
//   // });
//   app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/index.html"));
//   });

//   app.get("/signup", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/signup.html"));
//   });

//   app.get("/signin", function(req, res) {
//     res.sendFile(path.join(__dirname, "../views/signin.html"));
//   });




//   // Load example page and pass in an example by id
//   app.get("/users/:id", isLoggedIn, function(req, res) {
//     db.Users.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
//       console.log(dbExample);
//       res.render("example", {
//         example: dbExample
//       });
//     });
//   });
//   // app.post("/signup", function(req, res){
//   //   db.Users.create({

//   //   })
//   // })
//   // Render 404 page for any unmatched routes
//   app.get("*", function(req, res) {
//     res.render("404");
//   });
  
// };


var path = require("path");
//
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
//
module.exports = function(app) {
//
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      console.log("Logged in!");
      res.redirect("/members");
    }
    console.log("Not logged in!");
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
//
  app.get("/signin", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signin.html"));
  });
//
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be 
  //redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });
};
