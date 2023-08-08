//requirir express
const express = require('express');
//guardar la ejcucion de la funcionalidad de router en express
const router = express.Router();
// crear una variable para traerel maincontroller 
const productControllers = require('../controllers/productControllers');

// solo los principios de las routas y 
//pasar como segunda variable el maincontroller. ("el nombre de la funcion ")

//Linkeamos el archivo del router con el del controllers

router.get('/detalleProducto', productControllers.detalleProducto);

router.get('/carrito', productControllers.carrito);

router.get('/editionProduct', productControllers.editionProduct);

router.get('/products', productControllers.getList);

// @GET - /products/:id/detail
router.get('/products/:id/detail', productControllers.getDetail);

// @GET - /products/create
router.get('/products/create', productControllers.getCreate);

// @POST - /
router.post('/products', productControllers.postProduct);

// @GET - /products/:id/edit
router.get('/products/:id/edit', productControllers.getEdit);

// @DELETE - /products/:id/delete
router.delete('/products/:id/delete', productControllers.deleteProduct);

router.put('/products/:id/edit', productControllers.updateProduct);

// traer a  la funcion router
module.exports = router;