const express = require('express');
const request = require('request');
const app = express();
const path = require('path');

// Load View Engine
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));



app.get('/', function(req, res) {
  res.sendFile('main.html', {
    root: path.join(__dirname, './public/html')
  });
});


app.get('/AboutBloodGroup.html', function(req, res) {
  res.sendFile('AboutBloodGroup.html', {
    root: path.join(__dirname, './public/html')
  });
});

app.get('/BloodDonators.html', function(req, res) {
  res.sendFile('BloodDonators.html', {
    root: path.join(__dirname, './public/html')
  });
});


app.get('/Createaccount.html', function(req, res) {
  res.sendFile('Createaccount.html', {
    root: path.join(__dirname, './public/html')
  });
});

app.get('/SignIn.html', function(req, res) {
  res.sendFile('SignIn.html', {
    root: path.join(__dirname, './public/html')
  });
});








var server = app.listen(3000, function() {});
