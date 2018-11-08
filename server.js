// - - - - = = = = DEPENDENCIES = = = = - - - - //
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// - - - - = = = = APP = = = = - - - - //
const app = express();


// - - - - = = = = MIDDLEWARE = = = = - - - - //
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


// - - - - = = = = DB = = = = - - - - //
mongoose.connect('mongodb://localhost:27017/demo', { useNewUrlParser: true})

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
    .catch(err => res.json(err))
})


// api ....
// GET ALL
app.get('/users', function(req, res) {
  User.find({})
    .then(usersData => res.json(usersData))
    .catch(err => res.json(err))
})

// GET ONE
app.get('/users/:id', function(req, res) {
  const ID = req.params.id;
  User.find({ _id: ID })
  .then(user => res.json(user))
  .catch(err => res.json(err))
})

// ADD NEW
app.post('/users', function(req, res) {
  const DATA = req.body;

  User.find({ email: DATA.email })
    .then(data_from_db => {
      if (data_from_db.length > 0) { throw "User email already exists" }
      else { return User.find({ name: DATA.name }) }
    })
    .then(data_from_db => {
      if (data_from_db.length > 0) { throw "User name already exists" }
      else { return User.create(DATA) }
    })
    .then(() => res.redirect('/'))
    .catch(err => {
      res.json(err);
      res.redirect('/');
    })
})

app.get('/delete/user/:id', function(req, res) {
  const ID = req.params.id;
  User.find({ _id: ID }).remove()
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})



// - - - - = = = = PORT = = = = - - - - //
const PORT = 8000;
app.listen(PORT, function() {
  console.log(`Running on ${PORT}`)
  // console.log("Running on " + PORT);
})