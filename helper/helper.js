const bcrypt = require('bcrypt');
const { AmzItem, User } = require('../db/schema');
const scraper = require('product-scraper');
const parsePrice = require('parse-price');

const search = function(url, username, callback) {
  scraper.init(url, function({ title, price, image, details, url }) {
    AmzItem.findOne({ url }).then(result => {
      if (result !== null) {
        var { users } = result;
        if (users.includes(username)) return;
        else users.push(username);
      } else var users = [username];

      AmzItem.findOneAndUpdate(
        { url },
        { title, price: parsePrice(price), image, details, url, users },
        { upsert: true }
      ).then(updated => callback(null, updated)).catch(callback)
    })
  });
};

const redir = function(req, res, next) {
  if (req.url !== '/') res.status(301).redirect('/');
  else next();
};

const checkUser = function(req, res, next) {
  if (req.session.user === undefined) res.send('/');
  else next();
};

const findWishes = function(username, callback) {
  AmzItem.find({ users: { $elemMatch: { $eq: username } } })
    .then(callback)
};

const signup = function(username, password, email, callback) {
  bcrypt.genSalt(10, null, function(err, salt) {
    if (err) reject(err);
    bcrypt.hash(password, salt, function(err, hash) {
      new User({ username, password: hash, email }).save().then(saved => callback(null, saved)).catch(callback);
    });
  });
}

//functions, but need callback
const login = function(username, password, callback) {
  User.findOne({ username }).then(user => {
    bcrypt.compare(password, user.password).then(validation => {
      callback(validation)
    })
  });
};

module.exports = { search, redir, checkUser, findWishes, signup, login }