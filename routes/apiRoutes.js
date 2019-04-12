var db = require("../models");
var axios = require("axios");

var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var dateTime=require("../config/middleware/date-time.js");
module.exports = function(app) {

  // Get all users
  app.get("/api/sellOffers/user/:id", function(req, res) {
    db.sellOffers.findAll({UserId:req.params.id}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });
  
  //get all sell offer names and put in names_array
  app.get("/api/sellOffers/typeahead/names", function(req, res){
    db.sellOffers.findAll({}).then(function(offers){
      //res.json(offers);
      //console.log(offers.length);
      var names_array = [];
      for(var i = 0; i< offers.length; i++){
        names_array.push(offers[i].name);
      }
      res.send(names_array);
      console.log(names_array);
    })
  })
//
  
//create new sell offer
  app.post("/api/sellOffers", isAuthenticated, function(req, res) {
   db.sellOffers.create(req.body).then(function(dbExample) {

        return res.json("/homepage");
       //res.json(dbExample);
      // console.log("post request on sell");
    });
  });
//update sell offer - need to have a update button in sellOffer view of the specific users home page
app.put("/api/sellOffers", isAuthenticated,function(req, res){
    db.sellOffers.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(response){
      res.json(response);
    });
});

//buy request
app.put("/api/sellOffers/buy", isAuthenticated,function(req, res){
  console.log("userid:"+req.user.id);
  console.log("buyid:"+req.body.id);
  db.Users.findOne({where:{id:req.user.id}}).then(function(userData){
    db.sellOffers.findOne({where:{id:req.body.id}}).then(function(itemData){
      console.log(userData.dataValues);
      console.log(itemData.dataValues);
      var buyerCredits=Number(userData.dataValues.credits);
      var itemCost=Number(itemData.dataValues.price);
      var buyerId=Number(userData.dataValues.id);
      var sellerId=Number(itemData.dataValues.UserId);
      var itemId=itemData.dataValues.id;
      if(buyerCredits<itemCost){
       return res.json("Not enough credits");
      } else if(buyerId===sellerId){
       return res.json("You cannot buy from yourself!")
      } else if(itemData.dataValues.inTransaction||itemData.dataValues.hasBeenShippedBool||itemData.dataValues.tradeCompleteBool){
        return res.json("game is already in transaction")
      }else{
        db.sellOffers.update({inTransaction:1,
          buyerId:buyerId,
          transactionStartedAtTime:dateTime(),
          purgatoryCredits:itemCost.toString()
        },
        {where:{id:itemId}
      }).then(function(response){
          db.Users.update({
            credits:(buyerCredits-itemCost).toString()
          },{where:{id:buyerId}
        }).then(function(response){
            res.json("Success!");
            // res.redirect("/homepage");
            db.Users.findOne({where:{id:itemData.dataValues.UserId}}).then(function(sellerData){
              var sellerCredits=sellerData.credits;
              db.Users.update({credits:(Number(sellerCredits)+Number(itemCost)).toString()},{where:{id:itemData.dataValues.UserId}}).then(function(response){

              })
            });
            })
          });
        }
      }
    )
  })

});

  // Delete an sellOffer by id
  app.delete("/api/sellOffers/:id",isAuthenticated, function(req, res) {
    db.sellOffers.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

app.get("/api/sellOffers",function(req,res){
  db.sellOffers.findAll({}).then(function(data){
    res.json(data);
  })
});
app.get("/api/sellOffers/query/:name",function(req,res){
  db.sellOffers.findAll({where:{name:req.params.name,inTransaction:0,buyerId:null}}).then(function(data){
    res.json(data);
  })
});
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page - that user's home landing page.
  // Otherwise the user will be sent an error
//   app.post("api/signin", passport.authenticate("local", {
//     successRedirect : '/members',
//     failureRedirect : '/signin',
//     failureFlash : true
// }));
  app.post("/api/signin", passport.authenticate("local"),function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    //return res.json();
     //return res.json("/members");
     return res.json("/homepage");
  });
//
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model.


  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.Users.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      credits: 20,
      
    }).then(function() {
      return res.json("/signin");
      //console.log("going to sign in page...")

      
      //return res.redirect(307, "/member");
      //return res.redirect("/members");

    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });
//
  // Route for logging user out
  app.get("/logout", function(req, res) {
    console.log("At logout route");
    req.logout();
    
    return res.redirect("/");
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
      address: req.user.address
    });
  }
});

app.put("/api/users/add-credit/:id",function(req,res){
  db.Users.findOne({where:{id:req.params.id}}).then(function(userData){
    var currentCredits=userData.credits;
    console.log("got here");

    db.Users.update({credits:(20+Number(currentCredits)).toString()},{where:{id:req.params.id}}).then(function(response){
      console.log("updated");
    })
  })
})

//giantbomb route
app.get("/api/giantbomb/:name", function(req, res) {
  var name = req.params.name;
  // if (!req.user) {
  //   // The user is not logged in, send back an empty object
  //   res.json({});
  // }
  // else {
  //   // Otherwise ajax call to giant bomb
  //   // Sending obj
  var url = "https://www.giantbomb.com/api/search/?api_key="+process.env.GB_API+"&format=json&query="+name+"&resources=game";
  console.log(url);
  axios.get(url).then(function(result){
    console.log(result.data.results);
    res.json(result.data.results[0].image.medium_url);
  });
  // axios.get({
  //   url: url, 
  //   type: "GET",
  //   success: function(result){
  //     console.log(result.results[0].image.medium_url);
  //   }
  // });
  // }
});
};
