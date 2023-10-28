const express = require('express');

const apiUserControllers = require('../../controllers/api/apiUsersControllers');
const { route } = require('../mainRouters');

const router = express.Router();

router.get('/api/users', apiUserControllers.getListUser);

router.get('/api/users/:id/detail', apiUserControllers.getDetailById);

// ruta por query string /api/users/detail/?firstName=
router.get('/api/users/detail', apiUserControllers.getDetailByName);

module.exports = router;