var db = require("../models");

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
     return res.redirect("/members");
    }
    console.log("Not logged in!");
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
//
  app.get("/signin", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      console.log(req.user);
      return res.redirect("/members");
    }
    //console.log(req.flash('error'));
    
    res.sendFile(path.join(__dirname, "../public/signin.html"));

  });
   
//

app.get("/signup", function(req, res) {
  // If the user already has an account send them to the members page
  // if (req.user) {
  //   console.log(req.user);
  //   return res.redirect("/members");
  // }
  res.sendFile(path.join(__dirname, "../public/signup.html"));

});

  // app.get("/homepage",function(req,res){
  //   res.render("index",{credits:5,rating:4.4,firstName:"chris",lastName:"m"});
  // })
  // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });
//
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be 
  //redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    //res.sendFile(path.join(__dirname, "../public/members.html"));
    res.render("example", {example: req.user});
  });
};
