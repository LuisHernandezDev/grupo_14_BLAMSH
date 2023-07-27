//require path
const path = require('path');
// crear una variable para guadar las routas , es como un objeto que va a contener todas las routas de tu programa.
const controller = {


    register: (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/register.html'));
    },


    login: (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/login.html'));
    },



}
// exportar el controlador 
module.exports = controller;

