const axios = require('axios');
const { JSDOM } = require('jsdom');
const bcrypt = require('bcrypt');
const { AmzItem, User } = require('../db/schema');

//functions, but takes a long time
exports.search = function (url) {
  axios.get(url).then(({data}) => {
    const dom = new JSDOM(data);
    const document = dom.window.document;
    const price = document.getElementById('priceblock_ourprice').textContent.slice(1);
    const title = document.getElementById('productTitle').textContent.trim();

    AmzItem.findOneAndUpdate({url},
      {price, title}, {upsert: true})
  })
}

//functions, need callback?
exports.signup = function (username, password) {
  bcrypt.genSalt(10, null, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      new User({username, password: hash}).save()
    })
  })
}

//functions, but need callback
exports.login = function (username, password, callback) {
  User.findOne({username}).then(user => {
    bcrypt.compare(password, user.password).then(console.log)
    //logs true
  })
}