const bcrypt = require('bcrypt');
const { AmzItem, User } = require('../db/schema');
const scraper = require('product-scraper');
const parsePrice = require('parse-price');
const nodemailer = require('nodemailer');

const { userPass } = require('./userPass');
const transporter = nodemailer.createTransport(userPass );

const search = function(url, username, callback) {
  scraper.init(url, function({ title, price, image, details }) {
    AmzItem.findOne({ url }).then(result => {
      if (result !== null) {
        var { users } = result;
        if (users.some(user => user.username === username)) return;
        else users.push({username, wishPoint: parsePrice(price)});
      } else var users = [{username, wishPoint: parsePrice(price)}];

      title = title || 'NA';
      image = image || 'https://causeofaction.org/wp-content/uploads/2013/09/Not-available-300x300.gif';
      details = details || "my scraper can't find any details :("

      AmzItem.findOneAndUpdate(
        { url },
        { title, price: parsePrice(price), image, details, url, users },
        { upsert: true }
      )
        .then(updated => callback(null, updated))
        .catch(callback);
    });
  });
};

//testing
// search('https://www.ebay.com/itm/132826935829', 20, 'zen', console.log)

const checkUser = function(req, res, next) {
  if (req.session.user === undefined) res.send('/');
  else next();
};

const findWishes = function(username, callback) {
  AmzItem.find({ users: { $elemMatch: { username: username } } }).then(callback);
};

const signup = function(username, password, email, callback) {
  bcrypt.genSalt(10, null, function(err, salt) {
    if (err) reject(err);
    bcrypt.hash(password, salt, function(err, hash) {
      new User({ username, password: hash, email })
        .save()
        .then(saved => callback(null, saved))
        .catch(callback);
    });
  });
};

const login = function(username, password, callback) {
  User.findOne({ username }).then(user => {
    bcrypt.compare(password, user.password).then(validation => {
      callback(validation);
    });
  });
};

//emailing

const poll = function () {
  AmzItem.find({}).then(data => {
    data.forEach(item => {
      scraper.init(item.url, function({ price: newPrice }) {
        // console.log('old price: ', item.price, 'and new price: ', newPrice);
        newPrice = parsePrice(newPrice);
        if (newPrice < item.price) {
          var emailTarget = [];
          item.users.forEach(user => {
            if (newPrice <= user.wishPoint) {
              emailTarget.push(user.username);
              console.log('price dropped for user: ', user.username);
            }
          })
          AmzItem.findOneAndUpdate({url: item.url}, {price: newPrice}).then(() => {
            alertUsers (emailTarget, item.url, item.price, newPrice);
          })
        }
      })
    })
  });

  setTimeout(poll, 5000)
}

const alertUsers = function (users, url, price, newPrice) {
  users.forEach(user => {
    console.log('user is: ', user)
    User.findOne({username: user}).then(({email}) => {
      console.log('email exists for this user: ')
      console.log('the email constructed: ', createEmail(email, createHtml(url, price, newPrice)))
      transporter.sendMail(createEmail(email, createHtml(url, price, newPrice)), function(err, info){})
    })
  })
}

const createEmail = function (to, html) {
  return {
    from: 'zhengqing.pei@gmail.com',
    to,
    subject: 'The price of one of your wish items have dropped !!!',
    html
  }
}

const createHtml = function(url, price, newPrice) {
  return `
    <p>Your wish has been fulfilled !!! The price went from ${price} to ${newPrice} !!! </p>
    <a href=${url}>Link to your item</a>
  `
}


const updateWishPoint = function(url, username, wishPoint, callback) {
  AmzItem.find({ users: { $elemMatch: { username: username } } })
  AmzItem.findOne({url}).then(item => {
    item.users.forEach(user => user.wishPoint = wishPoint)
    console.log(item.users);
    AmzItem.findOneAndUpdate({url}, {users: item.users}).then(callback);
  })
}

//testing  --- this works
// updateWishPoint('https://www.ebay.com/itm/132826935829', 'zen', 5)

module.exports = { search, checkUser, findWishes, signup, login, poll, updateWishPoint };


//Testing
// alertUsers(['zen'], 'https://codeburst.io/sending-an-email-using-nodemailer-gmail-7cfa0712a799', 100, 50)



