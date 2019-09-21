const express = require('express');
const request = require('request');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile('main.html', {
    root: path.join(__dirname, './public/html')
  });
});

app.get('/About', function(req, res) {
  res.sendFile('About.html', {
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

app.get('/Java.html', function(req, res) {
  res.sendFile('Java.html', {
    root: path.join(__dirname, './public/html')
  });
});

app.get('/Python.html', function(req, res) {
  res.sendFile('Python.html', {
    root: path.join(__dirname, './public/html')
  });
});

app.get('/Automation.html', function(req, res) {
  res.sendFile('Automation.html', {
    root: path.join(__dirname, './public/html')
  });
});



var server = app.listen(3000, function() {});
