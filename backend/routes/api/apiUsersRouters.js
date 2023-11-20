const express = require('express');

const apiUserController = require('../../controllers/api/apiUsersController');
const { route } = require('../mainRouters');

const router = express.Router();

router.get('/api/users', apiUserController.getListUser);

router.get('/api/users/:id/detail', apiUserController.getDetailById);

// ruta por query string /api/users/detail/?firstName=
router.get('/api/users/detail', apiUserController.getDetailByName);

router.get('/api/users/last', apiUserController.getLastUser)

module.exports = router;