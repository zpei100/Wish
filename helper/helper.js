const axios = require('axios');
const { JSDOM } = require('jsdom');
const bcrypt = require('bcrypt');
const { AmzItem, User } = require('../db/schema');
const scraper = require('product-scraper');

//functions, but takes a long time
exports.search = function(url, username = 'zen') {
  scraper.init(url, function({ title, price, image, details, url }) {
    AmzItem.findOne({ url }).then(result => {
      if (result !== null) {
        var { users } = result;
        if (users.includes(username)) return;
        else users.push(username);
      } else var users = [username];

      AmzItem.findOneAndUpdate(
        { url },
        { title, price: price.slice(1), image, details, url, users },
        { upsert: true },
        function(err, result) {
          if (err) console.log('error is: ', err);
          console.log('result after db storage is: ', result);
        }
      );
    });
  });
};

exports.findWishes = function(username) {
  return new Promise(function(resolve, reject) {
    AmzItem.find({ users: { $elemMatch: { $eq: username } } })
      .then(resolve)
      .catch(reject);
  });
};

// exports.search('https://www.amazon.com/Echo-Sub-Bundle-2nd-Devices/dp/B07H18JY6K/ref=redir_mobile_desktop?_encoding=UTF8&ref_=ods_gw_ha_po_dc_092318', 'zen');

//functions, need callback?
exports.signup = function(username, password, email) {
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(10, null, function(err, salt) {
      if(err) reject(err);
      bcrypt.hash(password, salt, function(err, hash) {
        new User({ username, password: hash, email }).save().then(resolve).catch(reject);
      });
    });
  });
};

//functions, but need callback
exports.login = function(username, password, callback) {
  User.findOne({ username }).then(user => {
    bcrypt.compare(password, user.password).then(callback);
    //logs true
  });
};
