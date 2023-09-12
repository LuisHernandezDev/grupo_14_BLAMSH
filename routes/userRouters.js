//requirir express
const express = require('express');
//guardar la ejcucion de la funcionalidad de router en express
const router = express.Router();

// Requerimos express-validator, destructurando la función body.
const { body } = require('express-validator');

// Requerimos multer
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/users');
    },

    filename: (req, file, cb) => {
        let filename = `${Date.now()}_img_${file.originalname}`;
        cb(null, filename);
    }
});

const upload = multer({ storage });

// crear una variable para traerel maincontroller 
const userController = require('../controllers/userControllers');

//Validaciones middleware
const validations = [
    body('nombre').notEmpty().withMessage('Debes escribir un nombre'),
    body('email').notEmpty().withMessage('Debes escribir un email'),
    body('phone-number').notEmpty().withMessage('Debes escribir un número de teléfono'),
    body('password').notEmpty().withMessage('Debes ingresar una contraseña'),
    body('repeat-password').notEmpty().withMessage('Debes repetir la misma contraseña'),
    body('opcion1').notEmpty().withMessage('Debes aceptar las políticas de privacidad y los términos'),
]


// solo los principios de las routas y 
//pasar como segunda variable el maincontroller. ("el nombre de la funcion ")
router.get('/register', userController.register);

router.post('/register', [upload.single('img'), validations], userController.processRegister);

router.get('/login', userController.login);

router.post('/login', userController.processLogin);




// traer a  la funcion router
module.exports = router;