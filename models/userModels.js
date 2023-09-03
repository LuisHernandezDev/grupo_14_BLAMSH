const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const model = {
    fileRoute: path.join(__dirname, '../data/users.json'),

    create: (userData) => { // userData en definitiva termina siendo el newUser del controller

        const emailUsed = model.findByEmail(userData.email); // Acá dice que si encuentra el mail repetido lo retorna y no lo registra.

        if (emailUsed) {
            return ({
                error: "El valor del campo email ya está en uso"
            })
        }

        let users = JSON.parse(fs.readFileSync(model.fileRoute, 'utf-8')); // Convierte de JSON a Javascript

        const newUser = {
            id: uuid.v4(),
            ...userData
        };

        newUser.password = bcrypt.hashSync(newUser.password, 12); // Acá hasheamos el password

        users.push(newUser); // pusheamos el nuevo registro

        fs.writeFileSync(model.fileRoute, JSON.stringify(users), 'utf-8'); // // Convierte de Javascript a JSON

        return newUser;

    },

    findByEmail: (email) => { // Si encuentra un usuario con el email pasado, retorna el objeto completo
        const users = JSON.parse(fs.readFileSync(model.fileRoute, 'utf-8')); // Convierte de JSON a Javascript

        const repeated = users.find(user => user.email === email)
    
        return repeated || null;


    },

    findAll: () => {



    }



}

module.exports = model;