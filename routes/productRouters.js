//requirir express
const express = require('express');
//guardar la ejcucion de la funcionalidad de router en express
const router = express.Router();
// crear una variable para traerel maincontroller 
const maincontroller = require('../controllers/productControllers');
// solo los principios de las routas y 
//pasar como segunda variable el maincontroller. ("el nombre de la funcion ")

router.get('/detalleProducto', maincontroller.detalleProducto);

router.get('/carrito', maincontroller.carrito);

router.get('/editionProduct', maincontroller.editionProduct);




// traer a  la funcion router
module.exports = router;