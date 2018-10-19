const mongoose = require('mongoose');
const mlab = `mongodb://wish1111:wish1111@ds137003.mlab.com:37003/mvp`;

mongoose.connect(mlab);

const amzItemSchema = new mongoose.Schema({
  url: {
    type: String,
    unique: true
  },
  price: Number,
  title: String,
  users: [String],
  image: String,
  details: String
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

const AmzItem = mongoose.model('amzItem', amzItemSchema);
const User = mongoose.model('User', userSchema);

module.exports = { AmzItem, User };
