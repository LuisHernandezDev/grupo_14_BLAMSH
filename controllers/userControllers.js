//require path
const path = require('path');

// Requerimos express-validator, destructurando la función validationResult.
const { validationResult } = require('express-validator');

//Requerimos el Modelo para poder trabajar con él.
const userModels = require('/models/userModels');

// crear una variable para guadar las routas , es como un objeto que va a contener todas las routas de tu programa.
const controller = {


    register: (req, res) => {
        // res.sendFile(path.resolve(__dirname, '../views/register.html'));
        res.render('register');
    },

    processRegister: (req, res) => {
        const resultValidation = validationResult(req);
        const userData = {
            nombre: req.body.nombre,
            Email: req.body.email,
            Password: req.body.password,
            phone: req.body.phone-number,
            img: req.body.img,
            };        

            userModels.create (userData)

            res.send ();


    },

    login: (req, res) => {
        // res.sendFile(path.resolve(__dirname, '../views/login.html'));
        res.render('login');
    },

    processLogin: (req,res) => {
        const resultValidation = validationResult(req);
        return res.send(resultValidation);
    }





}
// exportar el controlador 
module.exports = controller;

