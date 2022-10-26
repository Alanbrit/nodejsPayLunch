const db = require('../config/config');

const Menu = {};

Menu.findBySchool = (id_escuela, result) => {
    const sql = `
    SELECT
        CONVERT(id, char) as id,
        dia,
        guisado,
        sopa_guarnicion,
        agua,
        postre,
        CONVERT(id_escuela, char) as id_escuela,
        updated_at
    FROM
        menus
    WHERE
        id_escuela = ?
    `;
    db.query(
        sql,
        id_escuela,
        (err, data) =>{
            if(err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, data);
            }
        }
    );
}

module.exports = Menu;