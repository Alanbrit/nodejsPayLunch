const passport = require('passport');
const menusController = require('../controllers/menusController');

module.exports = (app) => {
    app.get('/api/menus/findBySchool/:id_escuela', passport.authenticate('jwt', { session: false }), menusController.findBySchool);
}