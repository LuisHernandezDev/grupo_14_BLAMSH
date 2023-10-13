//requirir express
const express = require('express');
const path = require('path');

// Requerimos express-validator, destructurando la función body.
const { body } = require('express-validator');

// crear una variable para traer el userController 
// const userController = require('../controllers/userControllers');
const userDbController = require('../controllers/userControllersdb')

const authMiddleware = require('../middlewares/authMiddleware');

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
    body('firstName').notEmpty().withMessage('Debes escribir un nombre').bail()
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('lastName').notEmpty().withMessage('Debes escribir un apellido').bail()
    .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
    body('email')
        .notEmpty().withMessage('Debes escribir un correo electrónico').bail() // bail, detiene las validaciones si se ejecuta el primero, sino entonces salta a la segunda validación
        .isEmail().withMessage("Debes ingresar un formato de correo válido"),
    body('phone').notEmpty().withMessage('Debes escribir un número de teléfono'),
    body('password').notEmpty().withMessage('Debes ingresar una contraseña').bail()
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('opcion1').notEmpty().withMessage('Debes aceptar las políticas de privacidad y los términos'),
    body('image').custom((value, {req}) =>{
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        
        if (!file) {
            throw new Error('Debes subir una imagen');
        }else{
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions. includes(fileExtension)) {
                throw new Error(`Las extensiones de archivos permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
]


// solo los principios de las routas y 
//pasar como segunda variable el maincontroller. ("el nombre de la funcion ")

// router.get('/register', authMiddleware.guestUser, userController.register);
router.get('/register', authMiddleware.guestUser, userDbController.register);

// router.post('/register', upload.single('image'), userValidations, userController.postRegister);
router.post('/register', upload.single('image'), userValidations, userDbController.postRegister);


// router.get('/login', authMiddleware.guestUser, userController.login);
router.get('/login', authMiddleware.guestUser, userDbController.login);


// router.post('/login', userController.postLogin);
router.post('/login', userDbController.postLogin);


router.get('/profile', authMiddleware.authUser, userDbController.profile);

router.get('/profile/edit', authMiddleware.authUser, userDbController.editProfile);

router.put('/profile/edit', upload.single('image'), authMiddleware.authUser, userDbController.updateProfile);

router.get('/logout', userDbController.logout);


// router.get('/users', maincontroller.userlist);


// traer a  la funcion router
module.exports = router;