const User = require('./models');

module.exports = {

  home: function(req, res) {
    User.find({})
      .then(usersData => res.render('index', {users: usersData}))
      .catch(err => res.json(err))
  },

  getAll: function(req, res) {
    User.find({})
      .then(usersData => res.json(usersData))
      .catch(err => res.json(err))
  },
  
  getOne: function(req, res) {
    const ID = req.params.id;
    User.find({ _id: ID })
      .then(user => res.json(user))
      .catch(err => res.json(err))
  },
  
  addNew: function(req, res) {
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
      .then((user) => res.json(user))
      .catch(err => res.json(err))
  },
  
  updateUser: function(req, res) {
    const DATA = req.body;
    const ID = req.params.id;

    User.findByIdAndUpdate(ID, DATA)
      .then(() => res.json("success"))
      .catch(err => res.json(err))

    // User.find({ _id: ID })
    //   .then(user => {
    //     user.name = DATA.name;
    //     user.email = DATA.email;
    //     return user.save();
    //   })
    //   .then((user) => res.json(user))
    //   .catch(err => res.json(err))
  },
  
  deleteUser: function(req, res) {
    const ID = req.params.id;
    User.find({ _id: ID }).remove()
      .then(() => res.json({status: "success"}))
      .catch(err => res.json(err))
  },
  
  error: function(req, res) {
    res.json("Error 420: you're a towel!")
  }
}