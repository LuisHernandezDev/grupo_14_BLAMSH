//requirir express
const express = require('express');

// crear una variable para traerel maincontroller 
const userController = require('../controllers/userControllers');

// Requerimos express-validator, destructurando la función body.
const { body } = require('express-validator');
// crear una variable para traerel maincontroller 
const maincontroller = require('../controllers/userControllers');
// Requerimos multer
const multer = require('multer');

// const authMiddleware = require ('../middlewares/authMiddleware')

//guardar la ejcucion de la funcionalidad de router en express
const router = express.Router();

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


//Validaciones middleware
const userValidations = [
    body('firstName').notEmpty().withMessage('Debes escribir un nombre'),
    body('lastName').notEmpty().withMessage('Debes escribir un nombre'),
    body('email').notEmpty().withMessage('Debes escribir un email'),
    body('profile').notEmpty().withMessage('Debes elegir un perfil de usuario'),
    body('phone').notEmpty().withMessage('Debes escribir un número de teléfono'),
    body('image').notEmpty().withMessage('Debe agregar una imagen'),
    body('password').notEmpty().withMessage('Debes ingresar una contraseña'),
    body('repeat-password').notEmpty().withMessage('Debes repetir la misma contraseña'),
    body('opcion1').notEmpty().withMessage('Debes aceptar las políticas de privacidad y los términos'),
]


// solo los principios de las routas y 
//pasar como segunda variable el maincontroller. ("el nombre de la funcion ")
router.get('/register', userController.register);

router.post('/register', [upload.single('image'), userValidations], userController.processRegister);

router.get('/login', userController.login);

router.post('/login', userController.processLogin);

// router.get('/users', maincontroller.userlist);


// traer a  la funcion router
module.exports = router;