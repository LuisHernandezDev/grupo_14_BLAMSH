const fs = require('fs');


const middlewares = {

    /*ckeckAdmin: (req, res, next) => {
        const user = req.query.user;
        if (authorizedUsers.includes(user)) {
            next(); // Usuario autorizado, pasa al siguiente middleware
        } else {
            res.send('No tienes los privilegios para ingresar');
            // res.redirect('/'); // O se puede redireccionar al home u otra ruta
        }
    },*/

    checkIsloggedIn: (req, res, next) => {
        const user = req.session.user;
        res.locals.user = user;
        next();
    }
}


module.exports = middlewares;