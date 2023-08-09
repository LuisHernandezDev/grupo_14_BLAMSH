//requirir express
const express = require('express');

// crear una variable para traerel maincontroller 
const productControllers = require('../controllers/productControllers');

//Requerimos Multer
const multer = require('multer');

//guardar la ejcucion de la funcionalidad de router en express
const router = express.Router();


/*
Creamos un storage de multer
Seteamos el destination y el filename (dónde se guarda la img y con que nombre).
Inicializamos multer, pasándole el storage que creamos.
Pasamos este multer como segundo parámetro al router.post
*/

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/products'); // La ruta se pasa como si estuviesemos parados en app.js
    },

    filename: (req, file, cb) => { // Acá indicamos el nombre con que se guardará el archivo
        cb(null);
    }
});

const upload = multer({ storage });


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
router.post('/products', upload.single('img'), productControllers.postProduct); // Acá le indicamos a multer que la imagen esta subida en el body.name ya que el name del input debe coincidir con lo pasado como parámetro del single.

// @GET - /products/:id/edit
router.get('/products/:id/edit', productControllers.getEdit);

// @DELETE - /products/:id/delete
router.delete('/products/:id/delete', productControllers.deleteProduct);

router.put('/products/:id/edit', productControllers.updateProduct); // Acá también se puede utilizar la variable upload

// traer a  la funcion router
module.exports = router;