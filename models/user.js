const db = require('../config/config');
const bcrypt = require('bcryptjs');

const User = {};

User.findById = (id, result) => {
    const sql = `
    SELECT 
        CONVERT(id, char) AS id,
        name, 
        apellidos,
        numero,
        numero_2,
        saldo,
        email,
        password,
        rol,
        CONVERT(id_escuela, char) AS id_escuela,
        CONVERT(id_grupo, char) AS id_grupo
    FROM
        users
    WHERE 
        id = ?
    `;

    db.query(
        sql, 
        [id],
        (err, user) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido:', user[0]);
                result(null, user[0]);
            }
        }
    )
}


User.findByEmail = (email, result) => {
    const sql = `
    SELECT 
        id,
        name, 
        apellidos,
        numero,
        numero_2,
        saldo,
        email,
        password,
        rol,
        CONVERT(id_escuela, char) AS id_escuela,
        CONVERT(id_grupo, char) AS id_grupo
    FROM
        users
    WHERE 
        email = ?
    `;

    db.query(
        sql, 
        [email],
        (err, user) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido:', user[0]);
                result(null, user[0]);
            }
        }
    )
}

User.create = async (user, result) => {
    const hash = await bcrypt.hash(user.password, 10);
    const sql = `
        INSERT INTO
            users(
                name,
                apellidos,
                numero,
                numero_2,
                saldo,
                email,
                password,
                rol,
                id_escuela,
                id_grupo,
                created_at,
                updated_at
            )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

    db.query
    (
        sql,
        [
            user.name,
            user.apellidos,
            user.numero,
            user.numero_2,
            user.saldo,
            user.email,
            hash,
            user.rol,
            user.id_escuela,
            user.id_grupo,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del nuevo usuario:', res.insertId);
                result(null, res.insertId);
            }
        }
    )
}

User.update = (user, result) => {
    const sql = `
    UPDATE 
        users
    SET
        name = ?,
        apellidos = ?,
        numero = ?,
        numero_2 = ?,
        updated_at = ?
    WHERE
        id = ?
    `;
    db.query
    (
        sql,
        [
            user.name,
            user.apellidos,
            user.numero,
            user.numero_2,
            new Date(),
            user.id
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario actualizado', user.id);
                result(null, user.id);
            }
        }
    )
}

module.exports = User;