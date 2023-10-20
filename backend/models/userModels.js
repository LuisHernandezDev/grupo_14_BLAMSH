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

        let allUsers = model.finAll(); // Busca todos los usuarios
        /*let users = JSON.parse(fs.readFileSync(model.fileRoute, 'utf-8'));*/ // Convierte de JSON a Javascript

        const newUser = {
            id: uuid.v4(),
            ...userData
        };

        newUser.password = bcrypt.hashSync(newUser.password, 12); // Acá hasheamos el password

        allUsers.push(newUser); // pusheamos el nuevo registro

        fs.writeFileSync(model.fileRoute, JSON.stringify(allUsers, null, " "), 'utf-8'); // // Convierte de Javascript a JSON

        return newUser;

    },

    findByEmail: (email) => { // Si encuentra un usuario con el email pasado, retorna el objeto completo
        const users = JSON.parse(fs.readFileSync(model.fileRoute, 'utf-8')); // Convierte de JSON a Javascript
        const repeated = users.find(user => user.email === email)
        return repeated || null;

    },

    getData: () => { // Parsea todos los usuarios del json
        return JSON.parse(fs.readFileSync(model.fileRoute, 'utf-8'));

    },

    finAll: () => { // Trae todos los usuarios del json
        return model.getData();

    },

    findByPk: (id) => { // Busca por id
        let allUsers = model.finAll();
        let usersFound = allUsers.find(oneUser => oneUser.id === id);
        return usersFound;

    },

    findByField: (field, text) => { // Busca por cualquier campo
        let allUsers = model.finAll();
        let usersFound = allUsers.find(oneUser => oneUser[field] === text);
        return usersFound;

    },

   /* genereId: () => { // Busca el ultimo id y le suma 1
        let allUsers = model.finAll();
        let lastUser = allUsers[allUsers.length - 1] // tambien se puede hacer con .pop
        if (lastUser) {
            return lastUser.id + 1
        }
        return 1;
    }*/


delete: (id) => {
    let allUsers = model.finAll();
    let finalUsers = allUsers.filter(oneUser => oneUser.id !== id); // Acá filtramos por el id que NO es igual para poder eliminar el usuario. Devuelve todos los usuarios, menos el que corresponda con el id obtenido.
    fs.writeFileSync(model.fileRoute, JSON.stringify(finalUsers));
    return true;

}



}
/*console.log(model.findByPk("fb3fed48-cb1b-428b-b1f7-aac280145625"));*/ // con node models/userModels.js trae todos los usuarios en formarto JS, o buscar por id, por email, por cualquier campo o por lo que sea dependiendo el método.

module.exports = model;