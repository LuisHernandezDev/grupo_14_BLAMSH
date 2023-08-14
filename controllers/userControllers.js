//require path
const path = require('path');

// Requerimos express-validator, destructurando la función validationResult.
const { validationResult } = require('express-validator');

// crear una variable para guadar las routas , es como un objeto que va a contener todas las routas de tu programa.
const controller = {


    register: (req, res) => {
        // res.sendFile(path.resolve(__dirname, '../views/register.html'));
        res.render('register');
    },

    processRegister: (req, res) => {
        const resultValidation = validationResult(req);
        return res.send(resultValidation);
    },

    login: (req, res) => {
        // res.sendFile(path.resolve(__dirname, '../views/login.html'));
        res.render('login');
    }




}
// exportar el controlador 
module.exports = controller;

