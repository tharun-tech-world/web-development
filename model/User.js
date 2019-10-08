const mongoose = require('mongoose');

const session= require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        // required: true,
        // min: 6,
        // max: 255
    },
    email: {
        type: String,
        // required: true,
        // min: 6,
        // max: 255
    },
    password: {
        type: String,
        // required: true,
        // min: 6,
        // max: 255
    },
    // date: {
    //     type: Date,
    //     default: Date.now()
    // }


});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema)
module.exports = User;

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
