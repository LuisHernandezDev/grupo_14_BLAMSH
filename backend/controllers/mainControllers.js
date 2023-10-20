//require path
const path = require('path');
const db = require("../database/models");


// crear una variable para guadar las routas , es como un objeto que va a contener todas las routas de tu programa.
const controller = {
    home: async (req, res) => {
        // Respondemos a este request con este string, mediante res.send
        // const ruta = path.resolve(__dirname, '../views/home.html');
        const products = await db.Product.findAll({
            include: ['category', 'sizes'],
            nest: true
        })
        res.render('home', {user: req.session.user, products});
    }
};

// exportar el controlador 
module.exports = controller;

