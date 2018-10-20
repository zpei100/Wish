const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const path = require('path');

const helper = require('../helper/helper');

app.use(bodyParser.json());
app.use(session({
  secret: 'mvp',
  resave: true,
  saveUninitialized: true
}))

app.use(express.static(path.join(__dirname, '../client/build')))


//this will start polling:
//helper.poll();


app.get('/wishes', function(req, res) {
  helper.findWishes(req.session.user, function(items) {
    res.send(items)
  })
})

app.post('/search', function(req, res) {
  helper.search(req.body.url, req.session.user, function(err, saved) {
    if (err) res.status(400).send();
    res.send(saved);
  })
})

//functions
//need to auto turn on login status
app.post('/signup', function({body: {username, password, email}}, res) {
  helper.signup(username, password, email, function(err, response) {
    if (err) {
      console.log(err)
      res.status(400).send(err);
    }
    else res.send('success');
  })
})

app.post('/login', function({session, body: {username, password}}, res) {
  helper.login(username, password, function(validation) {
    session.regenerate(function() {
      session.user = username;
      res.send(validation);
    })
  })
})

app.post('/logout', function(req, res) {
  req.session.destroy();
})

app.listen(4000, console.log('server up on port 4000'));