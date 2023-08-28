//require path
const path = require('path');


// Requerimos express-validator, destructurando la función validationResult.
const { validationResult } = require('express-validator');
//requerir model
const usersModel = require('../models/usersModels');
const modelousuario = require('../models/usersModels')
// requerir bcrypt para poder encriptar informaciones 
const bcryptjs = require('bcryptjs');
// crear una variable para guadar las routas , es como un objeto que va a contener todas las routas de tu programa.
const controller = {


    register: (req, res) => {
        // res.sendFile(path.resolve(__dirname, '../views/register.html'));
        res.render('register');
    },

    processRegister: (req, res) => {
        const resultValidation = validationResult(req);

        let UsuarioInDB = modelousuario.findByField('email', req.body.email);
        if (UsuarioInDB) {
            return res.render('register', {
                errors: {
                    email: {
                        msg: "este email ya se encuentra registrado"
                    }
                },
                resultValidation: req
            });
        }



        let modeloUsuarioTocreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            "repeat-password": bcryptjs.hashSync(req.body.password, 10)

            //avatar: req.file.modeloUsuario


        }
        modelousuario.create(modeloUsuarioTocreate);

        return res.send(resultValidation);
    },






    login: (req, res) => {
        // res.sendFile(path.resolve(__dirname, '../views/login.html'));
        res.render('login');



    },


    userlist: (req, res) => {
        const users = usersModel.findAll();

        res.render('userlist', { users });
    }

};

module.exports = controller;