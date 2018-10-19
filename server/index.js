const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const app = express();
const session = require('express-session');
const path = require('path');

const helper = require('../helper/helper');

app.use(bodyParser.json());

app.use(session({
  secret: 'mvp'
}))

app.use(express.static(path.join(__dirname, '../client/build')))

//need to do:

//polling amazon based on database: url // price update
//a way to send emails to all users for that url
//adjust user sign up to include email address info + email validation
//url validation so our server doesn't crash
//error handling ---- last step


//functions
//need to validate url to be an actual item url
app.post('/search', function(req, res) {

  helper.search(req.body.url, req.session.user);
  res.send('got it !');
})

//functions
//need to auto turn on login status
app.post('/signup', function({body: {username, password, email}}, res) {
  helper.signup(username, password, email)
})

//have not tested session yet, but login works on the validation end
app.post('/login', function(req, res) {
  const { username, password } = req.body;
  
  helper.login(username, password, function(validated) {
    if (validated) req.session.regenerate(function(err) {
      req.session.user = username;
      res.redirect('/search')
    })
  })
})

app.post('/logout', function(req, res) {
  req.session.destroy();
})

app.listen(4000, console.log('server up on port 4000'));