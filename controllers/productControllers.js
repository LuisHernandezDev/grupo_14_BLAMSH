//require path
const path = require('path');
// crear una variable para guadar las routas , es como un objeto que va a contener todas las routas de tu programa.
const controller = {


    detalleProducto: (req, res) => {
        // res.sendFile(path.resolve(__dirname, '../views/detalleProducto.html'));
        res.render('detalleProducto');
    },

    carrito: (req, res) => {
        // res.sendFile(path.resolve(__dirname, '../views/carrito.html'));
        res.render('carrito');
    },


    editionProduct: (req, res) => {
        // res.sendFile(path.resolve(__dirname, '../views/editionProduct.html'));
        res.render('editionProduct');
    }
};

// exportar el controlador 
module.exports = controller;

