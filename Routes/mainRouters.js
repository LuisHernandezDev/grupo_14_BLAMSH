//requirir express
const express = require('express');
//guardar la ejcucion de la funcionalidad de router en express
const router = express.Router();
// crear una variable para traerel maincontroller 
const maincontroller = require('../Controllers/mainController');
// solo los principios de las routas y 
//pasar como segunda variable el maincontroller. ("el nombre de la funcion ")
router.get('/', maincontroller.home);
routerapp.get('/register', maincontroller.register);
routerapp.get('/detalleProducto', maincontroller.detalleProducto);
routerapp.get('/carrito', maincontroller.carrito);
routerapp.get('/login', maincontroller.login);

// traer a  la funcion router
module.exports = router;