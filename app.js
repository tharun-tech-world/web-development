const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ejs = require('ejs');
const bcrypt = require('bcryptjs');
const session= require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const User = require('./model/User');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');


//Imports Routes Here
 const authRoute = require('./routes/auth');
 const postRoute = require('./routes/postroutes');


 app.use(express.static('public'));
 app.set('view engine', 'ejs');

 //Middleware for body parser
 app.use(express.json());
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended: true}));

//Passport
app.use(session({
  secret: "Our little secret",
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

//Connect to Mongo DB using mongoose
dotenv.config();
mongoose.connect(process.env.DATABASE_CONNECT, {useNewUrlParser: true,
  useUnifiedTopology: true}).then(() => {
    console.log('Connected Successfully to MongoDB Atlas!');
}).catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
});
mongoose.set("useCreateIndex", true);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

passport.use(User.createStrategy());

//Google Strategy goes here.
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/tharuntechie",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id, username:profile.displayName}, function (err, user) {
      // User.findOrCreate({ googleId: profile.id, username: profile.id}, function (err, user) {
      return cb(err, user);
    });
  }
));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

//Google stategies.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


 //Routes Middlewares
 app.use('/', authRoute);
 app.use('/posts', postRoute);


var server = app.listen(3000, () => console.log('Server is up and running on port 3000.....'));
