const Menu = require('../models/menu');

module.exports = {
    
    findBySchool(req, res) {
        const id_escuela = req.params.id_escuela;

        Menu.findBySchool(id_escuela, (err, data) => {
            if(err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar los menus',
                    error: err
                });
            }
            
            return res.status(201).json(data);
        });
    }
}