const model = require('../models/userModels');
const userModel = require('../models/userModels');
const bcrypt = require('bcrypt');



// Requerimos express-validator, destructurando la función validationResult.
const { validationResult } = require('express-validator');

// crear una variable para guadar las routas , es como un objeto que va a contener todas las routas de tu programa.
const controller = {

    // register: (req, res) => {
    //     // res.sendFile(path.resolve(__dirname, '../views/register.html'));

    //     const error = req.query.error
    //     res.render('register', { error });
    // },

    // login: (req, res) => {
    //     // res.sendFile(path.resolve(__dirname, '../views/login.html'));
    //     const error = req.query.error
    //     res.render('login', { error });
    // },

    // postRegister: (req, res) => {
    //     const resultUserValidation = validationResult(req);

    //     if (resultUserValidation.errors.length > 0) {
    //         res.render('register', {
    //             errors: resultUserValidation.mapped(),
    //             bodyData: req.body // Lo usaremos para capturar en el value de la vista, la información que ingresó el usuario y mantenerla.
    //         });
    //     }
    //     const newUser = {
    //         firstName: req.body.firstName,
    //         lastName: req.body.lastName,
    //         email: req.body.email,
    //         phone: req.body.phone,
    //         image: req.file.filename,
    //         password: req.body.password,
    //     }

    //     const user = userModel.create(newUser); // Al método create le pasamos por parámetro el objeto de arriba

    //     if (user.error) {
    //         res.redirect('/register/?error=' + user.error);

    //     } else {
    //         res.redirect('/login')
    //     }

    // },

    // postLogin: (req, res) => {
    //     const userInDB = userModel.findByEmail(req.body.email); // Contiene el objeto completo del usuario, no solo el email... Busca el usuario, si lo encuentra, bien!, si no lo encuentra muestra null

    //     !userInDB ? res.redirect('/login/?error=Usuario no registrado') : ""; // Chequea si existe usuario con el email

    //     /*if (!userInDB) { // Si el usuario esta intentando hacer login con un email no registrado. Es decir, que no esté en el JSON */
    //     /* return res.redirect('/login/?error=El mail o la contraseña son incorrectos')
    //  };*/

    //     const validatePw = bcrypt.compareSync(req.body.password, userInDB.password); // Validamos si el password es igual, es decir, primer parámetro el password ingresado y el segundo parámetro con el passeword registrado.


    //     if (validatePw) { // Chequea si la clave es válida. // Acá una vez iniciada la sesion, con session se puede acceder desde cualquier lado.

    //         if (req.body.rememberme) { // Si se quiere mantener la sesión iniciada
    //             res.cookie('email', userInDB.email, { maxAge: 1000 * 60 * 60 * 24 }); // Se crea la cookie con fecha de exp de 1 año.

    //         } else {
    //             console.log('No se quiere mantener iniciada');
    //         }

    //         req.session.user = userInDB; // Propiedad generada al loguear al usuario
    //         res.redirect("/");

    //     } else {
    //         res.redirect('/login/?error=El mail o la contraseña son incorrectos');
    //     }
    // },

    // profile: (req, res) => {
    //     return res.render('userProfile', { user: req.session.user });

    // },

    // logout: (req, res) => {
    //     res.clearCookie('email');
    //     req.session.destroy();
    //     return res.redirect('/');
    // },


    // userlist: (req, res) => {
    //     const users = userModel.findAll();

    //     res.render('userList', { users });
    // }

};

module.exports = controller;