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



//Imports Routes Here
 const auth0Route = require('./routes/auth0');
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


 //Routes Middlewares
 app.use('/', auth0Route);
 app.use('/posts', postRoute);


var server = app.listen(3000, () => console.log('Server is up and running on port 3000.....'));
