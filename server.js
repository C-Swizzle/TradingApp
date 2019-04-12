require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

//passport set up
var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')
var path = require("path")

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

//app.use(express.static(_dirname + "./public"));
//app.use("/js", express.static(__dirname + '/js'));
//app.use("/images", express.static(__dirname + '/images'));

app.use(express.static("public"));
//app.use(express.static(path.join(__dirname, "public")));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
 
app.use(passport.initialize());
 
app.use(passport.session()); // persistent login sessions

//load passport strategies
 
//require('./config/passport.js')(passport, db.Users);

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app, passport);
require("./routes/htmlRoutes")(app, passport);
//var authRoute = require('./routes/auth.js')(app);

var syncOptions = { force: false};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
