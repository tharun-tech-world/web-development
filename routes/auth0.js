const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation')




router.get('/', function(req, res) {
  res.render("main");
});

router.get('/About', function(req, res) {
  res.sendFile('About.html', {
    root: path.join(__dirname, './public/html')
  });
});

router.get('/createaccount', function(req, res) {
res.render("Createaccount")
});

router.get('/signIn', function(req, res) {
  res.render("SignIn");
});

router.get('/java', function(req, res) {
  res.render("Java");
});

router.get('/python', function(req, res) {
res.render("Python");
});

router.get('/automation', function(req, res) {
res.render("Automation");
});


router.post("/createaccount",   async (req, res) => {

  //Validate the input data given in the form input fields before we create a user.
     const { error } = registerValidation(req.body);
     if(error) return res.status(400).send(error.details[0].message);

     //Checking if the user is already in the Mongo DataBase(DB)
     const emailExist = await User.findOne({email: req.body.email});
     if (emailExist) return res.status(400).send('Email already exists');

     //Hashing passwords
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Creating New User in Mongo DB with user input values.
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    try {
      const savedUser = await user.save();
      //console.log(savedUser);
      res.status(201).render("registersuccess");
  } catch(err) {
      res.status(400).send(err);
  }
})


router.post('/signin', async (req, res) => {
//
    //Validate the input data matches the criteria.
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking the email is exist or not ?
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send("Email doesn't exist");

    //Checking Password is correct or not ?
    const validpassword = await bcrypt.compare(req.body.password, user.password);
    if (!validpassword) return res.status(400).send('Invalid password');

    //Create and assign a jwttoken
    const jwttoken = jwt.sign({_id: user._id}, process.env.SECRET);
    res.header('auth0-token', jwttoken).render("Java");
    console.log(jwttoken);


    //res.send('Successfully Logged in...!')
})





// //Register Routing
// router.post('/register', async (req, res) => {
//
//     //Validate the input data given in the form input fields before we create a user.
//     const {error} = registerValidation(req.body);
//     if(error) return res.status(400).send(error.details[0].message);
//
//     //Checking if the user is already in the Mongo DataBase(DB)
//     const emailExist = await User.findOne({email: req.body.email});
//     if (emailExist) return res.status(400).send('Email already exists');
//
//     //Hashing passwords
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);
//
//     //Creating New User in Mongo DB with user input values.
//     const user = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: hashedPassword
//     });
//
//     try{
//         const savedUser = await user.save();
//         //res.send(savedUser);
//         res.send({user: user._id})
//     }catch(err){
//
//         res.send(400).send(err);
//     }
//
// });
//
// // Login Routing
// router.post('/login', async (req, res) => {
//
//     //Validate the input data matches the criteria.
//     const {error} = loginValidation(req.body);
//     if(error) return res.status(400).send(error.details[0].message);
//
//     //Checking the email is exist or not ?
//     const user = await User.findOne({email: req.body.email});
//     if (!user) return res.status(400).send("Email doesn't exist");
//
//     //Checking Password is correct or not ?
//     const validpassword = await bcrypt.compare(req.body.password, user.password);
//     if (!validpassword) return res.status(400).send('Invalid password');
//
//     //Create and assign a jwttoken
//     const jwttoken = jwt.sign({_id: user._id}, process.env.SECRET, {expiresIn:'60s'});
//     res.header('auth0-token', jwttoken).send(jwttoken);
//
//
//     //res.send('Successfully Logged in...!')
// })
//
module.exports = router;
