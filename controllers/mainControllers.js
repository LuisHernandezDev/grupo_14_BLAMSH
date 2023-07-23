//require path
const path = require('path');
// crear una variable para guadar las routas , es como un objeto que va a contener todas las routas de tu programa.
const controller = {
    home: (req, res) => {
        // Respondemos a este request con este string, mediante res.send
        const ruta = path.join(__dirname, '../views/home.html');
        res.sendFile(ruta);
    },

    register: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/register.html'));
    },

    detalleDelProducto: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/detalleProducto.html'));
    },

    carrito: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/carrito.html'));
    },

    login: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/login.html'));
    }


};
// exportar el controlador 
module.exports = controller;

