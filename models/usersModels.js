const { isUtf8 } = require('buffer');
const fs = require('fs');
const path = require('path');

const modeloUsuario = {


    findAll: () => {
        const jsonData = fs.readFileSync(path.resolve(__dirname, '../data/users.json'), 'Utf-8');

        const users = JSON.parse(jsonData);

        return users;
    },
    //creacion de id
    generateId: function () {
        let allusers = modeloUsuario.findAll();
        let lastUser = allusers.pop();
        if (lastUser) {
            return lastUser.id + 1;

        }
        return 1;


    },


    //bucar por id
    findByPK: function (id) {
        let allusers = modeloUsuario.findAll();
        let usersfound = allusers.find(oneuser => oneuser.id === id);
        return usersfound;

    },

    // buscar por cualquier campo 

    findByField: function (field, text) {
        let allusers = modeloUsuario.findAll();
        let usersfound = allusers.find(oneuser => oneuser[field] === text);
        return usersfound;

    },

    create: function (users) {
        let allusers = modeloUsuario.findAll();
        let newUser = {
            id: this.generateId(),
            ...users
        }
        allusers.push(newUser);
        fs.writeFileSync('./data/users.json', JSON.stringify(allusers, null, ''));
        return newUser;

    },
    delete: function (id) {
        let allusers = modeloUsuario.findAll();
        let usersFinal = allusers.filter(oneuser => oneuser.id !== id);
        fs.writeFileSync('./data/users.json', JSON.stringify(usersFinal, null, ''));
        return usersFinal;

    },


}
//console.log(modeloUsuario.create({ name: "Belab", email: "saintejourb@gmail.com" }));

module.exports = modeloUsuario;

//console.log(modeloUsuario.delete(21));

//console.log(modeloUsuario.findByField('email', 'mcopcott2@wufoo.com'));

