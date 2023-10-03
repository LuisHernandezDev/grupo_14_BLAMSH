//requirir express
const express = require('express');

// crear una variable para traerel maincontroller 
const productControllers = require('../controllers/productControllers');
const productControllersdb = require('../controllers/productControllersdb');


//Requerimos Multer
const multer = require('multer');

// Requerimos el método body de express-validator
const { body } = require('express-validator');

// Requerimos el middleware
const createProductMiddleware = require('../middlewares/createProductMiddleware');

const authMiddleware = require('../middlewares/authMiddleware');

//guardar la ejcucion de la funcionalidad de router en express
const router = express.Router();

// Validaciones: Es un array de Middleware
const allowedCategories = ["Ropa", "Accesorios", "Equipamiento y Repuestos"];
const productValidations = [
    body('name').notEmpty().isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('description').notEmpty().isLength({ min: 10 }).withMessage('El nombre debe tener al menos 10 caracteres'),
    body('image').notEmpty().withMessage('Debe agregar una imagen'),
    body('category').notEmpty().withMessage('Debe escoger la categoría del producto'),
    body('colors').notEmpty().withMessage('Debes seleccionar al menos un color'), // Preguntar si se puede hacer un input select.
    body('talle').notEmpty().withMessage('Debes seleccionar al menos una talla'), // Preguntar si se puede hacer un input select.
    body('price').notEmpty().isFloat({ min: 0.01 }).withMessage('El precio debe ser mayor a 0')
];

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
        console.log(file);
        cb(null, "img-" + Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });


//Linkeamos el archivo del router con el del controllers

// router.get('/detalleProducto', productControllers.detalleProducto);
router.get('/detalleProducto', productControllersdb.detalleProducto);

// router.get('/carrito', authMiddleware.authUser, productControllers.carrito);
router.get('/carrito', authMiddleware.authUser, productControllersdb.carrito);

// router.get('/editionProduct', authMiddleware.authUser, authMiddleware.guestUser, productControllers.editionProduct);
router.get('/editionProduct', authMiddleware.authUser, authMiddleware.guestUser, productControllersdb.editionProduct);

// router.get('/products', authMiddleware.authUser, authMiddleware.guestUser, productControllers.getList);
router.get('/products', authMiddleware.authUser, authMiddleware.guestUser, productControllersdb.getList);


// @GET - /products/:id/detail
// router.get('/products/:id/detail', authMiddleware.authUser, authMiddleware.guestUser, productControllers.getDetail);
router.get('/products/:id/detail', authMiddleware.authUser, authMiddleware.guestUser, productControllersdb.getDetail);


// @GET - /products/create
// router.get('/products/create', authMiddleware.authUser, authMiddleware.guestUser, productControllers.getCreate);
router.get('/products/create', authMiddleware.authUser, authMiddleware.guestUser, productControllersdb.getCreate);

// @POST - /products // A donde llegan los productos creados
// router.post('/products', [upload.array('image', 2), productValidations, createProductMiddleware], productControllers.postProduct); // Acá le indicamos a multer que la imagen esta subida en el body.name ya que el name del input debe coincidir con lo pasado como parámetro del single.
router.post('/products', [upload.single('image'), productValidations, createProductMiddleware], productControllersdb.postProduct); 

// @GET - /products/:id/edit
// router.get('/products/:id/edit', authMiddleware.authUser, authMiddleware.guestUser, productControllers.getEdit);
router.get('/products/:id/edit', authMiddleware.authUser, authMiddleware.guestUser, productControllersdb.getEdit);

// router.put('/products/:id/edit', productControllers.updateProduct); // Acá también se puede utilizar la variable upload
router.put('/products/:id/edit', productControllersdb.updateProduct); // Acá también se puede utilizar la variable upload


// @DELETE - /products/:id/delete
router.delete('/products/:id/delete', productControllers.deleteProduct);



router.get('/products/search', productControllers.searchProducts);

// traer a  la funcion router
module.exports = router;