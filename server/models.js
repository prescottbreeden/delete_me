const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/demo', { useNewUrlParser: true})

const UserSchema = new mongoose.Schema({
  name: {type: String},
  email: {type: String}
}, {timestamps: true})

mongoose.model('User', UserSchema);
const User = mongoose.model('User');

module.exports = User;