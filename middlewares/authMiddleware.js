const fs = require('fs');
const path = require('path');
const userModel = require('../models/userModels');


const middlewares = {


    isAdmin: (req, res, next) => {
        const user = req.session.user;
        const isAdmin = user && user.email === 'pepo@gmail.com'; // Middleware local. Verificamos si el usuario es administrador
        res.locals.isAdmin = isAdmin; // Pasamos la variable a res.locals para que esté disponible en la vista
        next();
    },
    

    checkIsloggedIn: (req, res, next) => { // Middleware local
        const user = req.session.user;
        res.locals.user = user; // Acá en local tenemos al usuario que se encuentra en session.
        next();
    },

    guestUser: (req, res, next) => { // Si la sesión esta iniciada, redirecciona a profile y no permitas ir a register
        if (req.session.user && req.session.user.email === 'pepo@gmail.com') {
            return next();

         } else if (req.session.user){
            return res.redirect('/');
        }
        next()
    },

    authUser: (req, res, next) => { // Si no tengo a nadie en session, entonces redirect al login.
        if (!req.session.user) {
            return res.redirect('/login');
        }
        next() // Si sí tengo a alguien en session, entonces next.

    },

    // Asi estaba el middleware solo con los usuarios guest
      /*guestUser: (req, res, next) => { // Si la sesión esta iniciada, redirecciona a profile y no permitas ir a register
        if (req.session.user) {
            return res.redirect('/profile');
        }
        next()

}*/

}

module.exports = middlewares;