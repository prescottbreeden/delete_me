// - - - - = = = = DEPENDENCIES = = = = - - - - //
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// - - - - = = = = APP = = = = - - - - //
const app = express();


// - - - - = = = = MIDDLEWARE = = = = - - - - //
app.use(bodyParser.urlencoded({ extended: true}));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


// - - - - = = = = DB = = = = - - - - //
mongoose.connect('mongodb://localhost:27017/demo')

const UserSchema = new mongoose.Schema({
  name: {type: String},
  email: {type: String}
}, {timestamps: true})

mongoose.model('User', UserSchema);
const User = mongoose.model('User');

// - - - - = = = = ROUTES = = = = - - - - //
app.get('/', function(req, res) {
  User.find({})
    .then(usersData => res.render('index', {users: usersData}))
    .catch(err => console.log(err))
})

app.post('/users', function(req, res) {
  const DATA = req.body;

  User.create(DATA)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))

  // const newUser = new User();
  // newUser.name = DATA.name;
  // newUser.email = DATA.email;
  // newUser.save()

})


// - - - - = = = = PORT = = = = - - - - //
const PORT = 8000;
app.listen(PORT, function() {
  console.log(`Running on ${PORT}`)
  // console.log("Running on " + PORT);
})