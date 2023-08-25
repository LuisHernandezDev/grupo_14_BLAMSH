const { isUtf8 } = require('buffer');
const fs = require('fs');
const path = require('path');

const modeloUsuario = {

    findAll: () => {
        const jsonData = fs.readFileSync(path.resolve(__dirname, '../data/users.json'), 'Utf-8');
        console.log(jsonData);
        const users = JSON.parse(jsonData);


        return users;

    },
    findById: () => {

    }



};
module.exports = modeloUsuario; 