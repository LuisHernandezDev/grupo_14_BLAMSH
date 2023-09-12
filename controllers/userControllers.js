//require path
const path = require('path');

// Requerimos express-validator, destructurando la función validationResult.
const { validationResult } = require('express-validator');

//Requerimos el Modelo para poder trabajar con él.
const userModels = require('../models/userModels');

//Requerimos bcrypt para comparar la contraseña ingresada (string) con la hasheada del JSON
const bcrypt = require ('bcrypt');

//Requerimo session para guardar los datos de usuario en el server
const session = require ('express-session');
const { log } = require('console');

// crear una variable para guadar las routas , es como un objeto que va a contener todas las routas de tu programa.
const controller = {


    register: (req, res) => {

        const error = req.query.error;

        // res.sendFile(path.resolve(__dirname, '../views/register.html'));
        res.render('register' , {error});
    },

    processRegister: (req, res) => {
        const resultValidation = validationResult(req);
        const userData = {
            nombre: req.body.nombre,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            img: req.body.img,
            };        

            const user = userModels.create (userData);

            if (user.error) {
                res.redirect ('/register?error=' + user.error)
            } else {
                res.redirect ('/')
            };
    },

    login: (req, res) => {

        const error = req.query.error;

        res.render('login', {error});
    },

    processLogin: (req,res) => {
       const userInJson = userModels.findByEmail(req.body.email);
       console.log (userInJson);
       res.send ('Login');
    }
    
}

// exportar el controlador 
module.exports = controller

