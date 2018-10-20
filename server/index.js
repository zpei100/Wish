const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const path = require('path');

const helper = require('../helper/helper');

app.use(bodyParser.json());
app.use(
  session({
    secret: 'mvp',
    resave: true,
    saveUninitialized: true
  })
);

app.use(express.static(path.join(__dirname, '../client/build')));

//this will start polling:
helper.poll();

app.get('/wishes', function(req, res) {
  helper.findWishes(req.session.user, function(items) {
    res.send(items);
  });
});

app.post('/search', function(req, res) {
  console.log('session user: ', req.session.user)

  helper.search(req.body.url, req.session.user, function(err, saved) {
    if (err) res.status(400).send();
    res.send(saved);
  });
});

app.post('/wishPoint', function(req, res) {
  
})

//functions
//need to auto turn on login status
app.post('/signup', function(req, res) {
  const {body: {username, password, email}} = req;
  helper.signup(username, password, email, function(err, response) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      req.session.regenerate(function() {
        req.session.user = username;
        res.send('success');
      })
    };
  })
});

app.post('/login', function(req, res) {
  const {body: {username, password}} = req;
  helper.login(username, password, function(validation) {
    req.session.regenerate(function() {
      req.session.user = username;
      res.send(validation);
    });
  });
});

app.post('/logout', function(req, res) {
  req.session.destroy();
});

const port = process.env.PORT || 8000;

app.listen(port, function() {
  console.log(`server up on ${port}`);
});
