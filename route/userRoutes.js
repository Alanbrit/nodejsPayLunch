const userController = require('../controllers/usersController');
const passport = require('passport');

module.exports = (app) => {
    app.post('/api/users/create', userController.register);
    app.post('/api/users/login', userController.login);

    app.put('/api/users/update', passport.authenticate('jwt', { session: false }), userController.update);
}