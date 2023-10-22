//requirir express
const express = require('express');
const path = require('path')

// crear una variable para traerel maincontroller 
// const productControllers = require('../controllers/productControllers');
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

/*
Creamos un storage de multer
Seteamos el destination y el filename (dónde se guarda la img y con que nombre).
Inicializamos multer, pasándole el storage que creamos.
Pasamos este multer como segundo parámetro al router.post o .put
*/

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/products'); // La ruta se pasa como si estuviesemos parados en app.js
    },

    filename: (req, file, cb) => { // Acá indicamos el nombre con que se guardará el archivo
        console.log(file);
        cb(null, "img-" + Date.now() + "-" + file.originalname);
        // cb(null, `img-${Date.now}-${file.filename}`)
    }
});

const upload = multer({ storage });

// Validaciones: Es un array de Middleware
const productValidations = [
    body('name')
    .notEmpty().withMessage('Debes ingresar el nombre del producto').bail()
    .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
    body('description')
    .notEmpty().withMessage('Debes ingresar la descripción del producto').bail()
    .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),
    body('price')
    .notEmpty().withMessage('Debes ingresar el precio del producto').bail()
    .notEmpty().isFloat({ min: 0.01 }).withMessage('El precio debe ser mayor a 0'),
    body('category').notEmpty().withMessage('Debes escoger la categoría del producto'),
    body('size').notEmpty().withMessage('Debes seleccionar al menos una talla'), // Preguntar si se puede hacer un input select.
    body('image').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        
        if (!file) {
            throw new Error('Debes agregar una imagen');
        }else{
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions. includes(fileExtension)) {
                throw new Error(`Las extensiones de archivos permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })

];



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
router.post('/products', upload.single('image'), productValidations, createProductMiddleware, productControllersdb.postProduct); 

// @GET - /products/:id/edit
// router.get('/products/:id/edit', authMiddleware.authUser, authMiddleware.guestUser, productControllers.getEdit);
router.get('/products/:id/edit', authMiddleware.authUser, authMiddleware.guestUser, productControllersdb.getEdit);

// router.put('/products/:id/edit', productControllers.updateProduct); // Acá también se puede utilizar la variable upload
router.put('/products/:id/edit', upload.single('image'), productValidations, productControllersdb.updateProduct); // Acá también se puede utilizar la variable upload


// @DELETE - /products/:id/delete
// router.delete('/products/:id/delete', productControllers.deleteProduct);
router.delete('/products/:id/delete', productControllersdb.deleteProduct);


router.get('/products/search', productControllersdb.searchProducts);

// traer a  la funcion router
module.exports = router;