//require path
const path = require('path');

const session = require ('express-session');

// crear una variable para guadar las routas , es como un objeto que va a contener todas las routas de tu programa.
const controller = {
    home: (req, res) => {
        // Respondemos a este request con este string, mediante res.send
        // const ruta = path.resolve(__dirname, '../views/home.html');
        res.render('home', { user : req.session.user });
    }
};

// exportar el controlador 
module.exports = controller;

