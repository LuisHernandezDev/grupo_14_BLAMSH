//requirir express
const express = require('express');
//guardar la ejcucion de la funcionalidad de router en express
const router = express.Router();
// crear una variable para traerel maincontroller 
const maincontroller = require('../controllers/userControllers');
// solo los principios de las routas y 
//pasar como segunda variable el maincontroller. ("el nombre de la funcion ")

router.get('/register', maincontroller.register);

router.get('/login', maincontroller.login);


// traer a  la funcion router
module.exports = router;