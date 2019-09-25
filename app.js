const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ejs = require('ejs');
const bcrypt = require('bcryptjs');


//Imports Routes Here
 const auth0Route = require('./routes/auth0');
 const postRoute = require('./routes/postroutes');


dotenv.config();

//Connect to Mongo DB using mongoose
mongoose.connect(process.env.DATABASE_CONNECT, {useNewUrlParser: true,
  useUnifiedTopology: true}) // If you are using a cluster, this will be generated for you
.then(() => {
    console.log('Connected Successfully to MongoDB Atlas!');
})
.catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.static('public'));
app.set('view engine', 'ejs');

//Middleware for body parser
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

 //Routes Middlewares
 app.use('/', auth0Route);
 app.use('/posts', postRoute);


var server = app.listen(3000, () => console.log('Server is up and running on port 3000.....'));
