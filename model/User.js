const mongoose = require('mongoose');
const session= require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        // required: true,
        // min: 6,
        // max: 255
    },
    email: {
        type: String,
        require: true,
        index:true,
        unique:true,
        sparse:true
        // min: 6,
        // max: 255
    },
    password: {
        type: String,
        // required: true,
        // min: 6,
        // max: 255
    },
    googleId: {
      type: String,
      require: true,
      index:true,
      unique:true,
      sparse:true

    },
    date: {
        type: Date,
        default: Date.now()
    }


});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema)

module.exports = User;
