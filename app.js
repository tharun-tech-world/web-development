const express = require('express');
const request = require('request');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ejs = require('ejs');
const bcrypt = require('bcryptjs');


const User = require ('./model/User');
const {registerValidation, loginValidation} = require('./validation')

dotenv.config();

//Connect to Mongo DB using mongoose
mongoose.connect( process.env.DATABASE_CONNECT, {useNewUrlParser: true},
    () => console.log('Connected to Mongo DB')
);


app.use(express.static('public'));
app.set('view engine', 'ejs');

//Middleware for body parser
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res) {
  res.render("main");
});

app.get('/About', function(req, res) {
  res.sendFile('About.html', {
    root: path.join(__dirname, './public/html')
  });
});

app.get('/Createaccount', function(req, res) {
res.render("Createaccount")
});

app.get('/SignIn', function(req, res) {
  res.render("SignIn");
});

app.get('/Java', function(req, res) {
  res.render("Java");
});

app.get('/Python', function(req, res) {
res.render("Python");
});

app.get('/Automation', function(req, res) {
res.render("Automation");
});


app.post("/createaccount",  (req, res) => {

  // //Validate the input data given in the form input fields before we create a user.
  //    const {error} = registerValidation(req.body);
  //    if(error) return res.status(400).send(error.details[0].message);
  //
  //    //Checking if the user is already in the Mongo DataBase(DB)
  //    const emailExist = await User.findOne({email: req.body.email});
  //    if (emailExist) return res.status(400).send('Email already exists');
  //
  //    //Hashing passwords
  //    const salt = await bcrypt.genSalt(10);
  //    const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Creating New User in Mongo DB with user input values.
    const user = new User({
        // name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    console.log(user);

    try{
       const savedUser = user.save();

        console.log(savedUser);

       //console.log(res.send(savedUser));
       //console.log(res.send({user: user._id}));

   }catch(err){

      console.log(err);
       //res.sendStatus(400).send(err);
   }
})



var server = app.listen(3000, () => console.log('Server is up and running on port 3000.....'));
