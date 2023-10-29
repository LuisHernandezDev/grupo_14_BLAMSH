const express = require('express');

const apiProductsController = require('../../controllers/api/apiProductsController');


const router = express.Router();

router.get('/api/products', apiProductsController.getListProduct);

router.get('/api/products/:id/detail', apiProductsController.getDetailById);


module.exports = router;