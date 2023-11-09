const express = require('express');

const apiProductsController = require('../../controllers/api/apiProductsController');


const router = express.Router();

router.get('/api/products', apiProductsController.getListProductPaginated);

router.get('/api/products/:id/detail', apiProductsController.getDetailById);

// ruta por query string /api/users/detail/?name=
router.get('/api/products/detail', apiProductsController.getDetailByName);

router.get('/api/products/last', apiProductsController.getLastProduct);

router.get('/api/products/list', apiProductsController.getListProduct);


module.exports = router;