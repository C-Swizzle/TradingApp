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
     //return res.redirect("/members");
     return res.redirect("/homepage");
    }
    console.log("Not logged in!");
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
//trying to access typeahead script file
  app.get('/public/js/typeahead.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/js/typeahead.js'));
});


//
  app.get("/signin", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      console.log(req.user);
      //return res.redirect("/members");
      return res.redirect("/homepage");
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

app.get("/homepage", isAuthenticated,function(req,res){
  // if(!req.user){
  //   res.redirect("/");
  // } else{
    db.sellOffers.findAll({where: {UserId:req.user.id}}).then(function(data){
      db.sellOffers.findAll({where:{buyerId:req.user.id}}).then(function(otherData){

      res.render("index",{
        firstName:req.user.firstName,
        lastName:req.user.lastName,
        email: req.user.email,
        rating:req.user.rating,
        id: req.user.id, 
        address: req.user.address,
        credits: req.user.credits,
        numberOfTrades:req.user.numberOfTrades,
        numberOfPositiveRatings:req.user.numberOfPositiveRatings,
        numberOfNegativeRatings:req.user.numberOfNegativeRatings,
        salesData:data,
        buyData:otherData
      });
    })
    });
//}
});

app.get("/list-game", isAuthenticated,function(req, res) {
  // If the user already has an account send them to the members page
  // if (req.user) {
  //   console.log(req.user);
  //   return res.redirect("/members");
  // }
  res.render("add-game",{
    firstName:req.user.firstName,
    lastName:req.user.lastName,
    email: req.user.email,
    rating:req.user.rating,
    id: req.user.id, 
    address: req.user.address,
    credits: req.user.credits,
    numberOfTrades:req.user.numberOfTrades,
    numberOfPositiveRatings:req.user.numberOfPositiveRatings,
    numberOfNegativeRatings:req.user.numberOfNegativeRatings
  })

});
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
  app.get("/random-page",isAuthenticated,function(req,res){
    res.redirect("/homepage");
  })
};
