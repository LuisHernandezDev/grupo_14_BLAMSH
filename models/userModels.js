//Requerimos 'fs' para poder trabajar con nuestra base de datos JSON
const fs = require('fs');
const path = require('path');
const router = require('../routes/userRouters');
const controller = require ('../controllers/userControllers');
const bcrypt = require ('bcrypt');

//Requerimos uuid para generar los id de usuarios únicos automaticamente
const uuid = require ('uuid');


const model = {

    fileRoute: path.join(__dirname, '../data/users.json'),

    create:(userData) =>{

        let users = JSON.parse (fs.readFileSync (model. fileRoute, 'utf-8'));

        const emailInUse = model. findByEmail (userData.email);

        if (emailInUse){
            return ({error: 'El email ingresado ya se encuentra registrado'});
        };   

        let newUser = {
            id: uuid.v4(),
            ... userData
        };

        const hashedPw = bcrypt.hashSync (newUser.password, 12);
        newUser.password = hashedPw;

        users.push (newUser);
        fs.writeFileSync (model.fileRoute, JSON.stringify (users), 'utf-8');
        return newUser;

    },


    findByEmail: (email) => {
        const users = JSON.parse (fs.readFileSync (model. fileRoute, 'utf-8'));
        const coincidence = users.find (usuarioActual => usuarioActual.email === email);

        return coincidence || null;

    },

 
}

module.exports = model;