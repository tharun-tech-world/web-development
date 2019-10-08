const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../model/User');
const {
  registerValidation,
  loginValidation
} = require('../validation')

const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');


router.get('/', function(req, res) {
  res.render("landing");
});

router.get('/About', function(req, res) {
  res.sendFile('About.html', {
    root: path.join(__dirname, './public/html')
  });
});

router.get('/createaccount', function(req, res) {
  res.render("Createaccount")
});

router.get('/signin', function(req, res) {
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

router.get("/success", function(req, res) {

  if (req.isAuthenticated()) {
    res.render("success")
  } else(
    res.redirect("/signin")
  )
})

router.get("/main", function(req, res) {

  if (req.isAuthenticated()) {
    res.render("main")
  } else(
    res.redirect("/signin")
  )
})

router.get("/signout", function(req, res) {
  req.logout();
  res.redirect("/");
})

router.post("/createaccount", async (req, res) => {

  User.register({
    username: req.body.username
  }, req.body.password, function(err, user) {

    if (err) {
      //console.log(err);
      res.status(400).send(err.message);
      res.redirect("/createaccount");
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/success")
      })
    }
  })
});

router.post("/signin", function(req, res) {

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/main");
      });
    }
  })
})





//
// router.post("/createaccount",   async (req, res) => {
//
//   //Validate the input data given in the form input fields before we create a user.
//      const { error } = registerValidation(req.body);
//      if(error) return res.status(400).send(error.details[0].message);
//
//      //Checking if the user is already in the Mongo DataBase(DB)
//      const emailExist = await User.findOne({email: req.body.email});
//      if (emailExist) return res.status(400).send('Email already exists');
//
//      //Hashing passwords
//      const salt = await bcrypt.genSalt(10);
//      const hashedPassword = await bcrypt.hash(req.body.password, salt);
//
//   //Creating New User in Mongo DB with user input values.
//     const user = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: hashedPassword
//     })
//
//     try {
//       const savedUser = await user.save();
//       //console.log(savedUser);
//       res.status(201).render("success");
//   } catch(err) {
//       res.status(400).send(err);
//   }
// })
//
//
// router.post('/signin', async (req, res) => {
// //
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
//     const jwttoken = jwt.sign({_id: user._id}, process.env.SECRET, {expiresIn: '24h'});
//     res.header('auth0-token', jwttoken).render("main");
//     console.log(jwttoken);
//
//
//     //res.send('Successfully Logged in...!')
// })


module.exports = router;
