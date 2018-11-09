const controllers = require('./controllers')

module.exports = function(app) {

  app
    .get('/', controllers.home) 
    .get('/users', controllers.getAll)
    .get('/users/:id', controllers.getOne)
    .post('/users', controllers.addNew)
    .put('/users/:id', controllers.updateUser)
    .delete('/users/:id', controllers.deleteUser)
    .get('*', controllers.error)

}