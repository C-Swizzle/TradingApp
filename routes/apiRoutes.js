var db = require("../models");

var passport = require("../config/passport");

module.exports = function(app) {
  // Get all users
  app.get("/api/sellOffers/:id", function(req, res) {
    db.sellOffers.findAll({UserId:req.params.id}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
//create new user

// app.post("/api/users", function(req, res) {
//   console.log(req.body);
//   db.Users.create({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     username: req.body.username,
//     email: req.body.email,
//     password: req.body.password,
//     address: req.body.address,
//     credits: 20
//   })
//     .then(function(dbPost) {
//       res.json(dbPost);
//     });
//});
  // app.post("/api/users", function(req, res) {
  //   db.Users.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
//create new sell offer
  app.post("/api/sellOffers", function(req, res) {
    db.sellOffers.create(req.body).then(function(dbExample) {
      res.json(dbExample);
      console.log("post request on sell");
    });
  });
//update sell offer - need to have a update button in sellOffer view of the specific users home page
app.put("/api/sellOffers", function(req, res){
    db.sellOffers.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(response){
      res.json(response);
    });
});

  // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });



  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/signin", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });
//
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error


  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.Users.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      credits: 20
      
    }).then(function() {
      res.redirect(307, "/api/signin");

    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });
//
  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
//

// Route for getting some data about our user to be used client side
app.get("/api/user_data", function(req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  }
  else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id, 
      address: req.user.address,
      credits: req.user.credits,
      numberOfTrades:req.user.numberOfTrades
    });
  }
});
};
// db.Users.create({username:"cmack",password:"password",credits:10,email:"something@gmail.com",firstName:"chris",lastName:"mack"}).then(function(){
//   console.log("did it");
// });
