//require path
const path = require('path');
// crear una variable para guadar las routas , es como un objeto que va a contener todas las routas de tu programa.
const controller = {
    home: (req, res) => {
        // Respondemos a este request con este string, mediante res.send
        const ruta = path.resolve(__dirname, '../views/home.html');
        res.sendFile(ruta);
    },

    register: (req, res) => { 
        res.sendFile(path.resolve(__dirname, '../views/register.html'));
    },

    detalleProducto: (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/detalleProducto.html'));
    },

    carrito: (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/carrito.html'));
    },

    login: (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/login.html'));
    },

    editionProduct: (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/editionProduct.html'));
    }
};

// exportar el controlador 
module.exports = controller;

