const fs = require('fs');
const path = require('path');
const userModel = require('../models/userModels');


const middlewares = {


    isAdmin: (req, res, next) => {
        const user = req.session.user;
        const isAdmin = user && user.email === 'pepo@gmail.com'; // Verificamos si el usuario es administrador
        res.locals.isAdmin = isAdmin; // Pasamos la variable a res.locals para que esté disponible en la vista
        next();
    },
    

    checkIsloggedIn: (req, res, next) => {
        const user = req.session.user;
        res.locals.user = user;
        next();
    },

    guestUser: (req, res, next) => {
        if (req.session.user) {
            return res.redirect('/profile');
        }
        next()
    },

    authUser: (req, res, next) => {
        if (!req.session.user) {
            return res.redirect('/login');
        }
        next()


    }

}

module.exports = middlewares;