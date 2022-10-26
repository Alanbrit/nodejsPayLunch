const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const update = require('../models/user');

module.exports = {

    login(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        User.findByEmail(email, async (err, myUser) => {
            console.log('Error', err);
            console.log('Usuario', myUser);
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro de usuario',
                    error: err
                });
            }
            if (!myUser) {
                return res.status(401).json({
                    success: false,
                    message: 'El email no fue encontrado',
                    error: err
                });
            }

            const isPasswordValid = await bcrypt.compare(password, myUser.password);

            if (isPasswordValid) {
                const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {});
                const data = {
                    id: `${myUser.id}`,
                    name: myUser.name,
                    apellidos: myUser.apellidos,
                    numero: myUser.numero,
                    numero_2: myUser.numero_2,
                    saldo: myUser.saldo,
                    email: myUser.email,
                    rol: myUser.rol,
                    id_escuela: myUser.id_escuela,
                    id_grupo: myUser.id_grupo,
                    session_token: `JWT ${token}`
                }
                return res.status(201).json({
                    success: true,
                    message: 'El usuario fue autenticado',
                    data: data
                });
            }
            else {
                return res.status(401).json({
                    success: false,
                    message: 'El password es incorrecto',
                    error: err
                });
            }
        });
    },

    register(req, res) {
        const user = req.body;
        User.create(user, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro de usuario',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente',
                data: data
            });
        });
    },
    
    async update(req, res) {
        const user = req.body;
        

        User.update(user, (err, data) =>{
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro de usuario',
                    error: err
                });
            }
            User.findById(data, (err, myData) =>{
                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error con el registro de usuario',
                        error: err
                    });
                }
                
                myData.session_token = user.session_token;

                return res.status(201).json({
                    success: true,
                    message: 'El usuario se actualizo correctamente',
                    data: myData
                });
            });            
        });
    }
}