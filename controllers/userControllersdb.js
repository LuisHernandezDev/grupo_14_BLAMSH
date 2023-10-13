const db = require("../database/models");
const bcrypt = require('bcrypt');
const path = require('path');

const { validationResult } = require('express-validator');
const { log } = require("console");

const userController = {

    register: (req, res) => {

        const error = req.query.error
        res.render('register', { error });

    },

    login: (req, res) => {

        const error = req.query.error
        res.render('login', { error });

    },

    postRegister: async (req, res) => {

        const resultUserValidation = validationResult(req);

        if (resultUserValidation.errors.length > 0) {
            res.render('register', {
                errors: resultUserValidation.mapped(),
                bodyData: req.body // Lo usaremos para capturar en el value de la vista, la información que ingresó el usuario y mantenerla.
            });
        };

        const emailUsed = await db.User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (emailUsed) {
            return res.render('register', {
                error: 'El correo electrónico ya está en uso',
                bodyData: req.body // Acá mantenemos los datos que el usuario ingresó en el formulario
            });

        }

        try {
            const hashPassword = bcrypt.hashSync(req.body.password, 10);

            // const pathImage = path.join(__dirname, "./public/images/users", req.file.filename); // Crea la ruta completa donde se guarda la img

            const newUser = {
                identification: req.body.identification,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
                email: req.body.email,
                password: hashPassword,
                rol_id: req.body.rol_id,
                image: req.file.filename

            };

            await db.User.create(newUser)

            res.redirect('/login')

            if (user.error) {
                res.redirect('/register/?error=' + user.error);

            }
        } catch (error) {
            console.error(error)
        }

    },

    postLogin: async (req, res) => {

        try {
            const userInDB = await db.User.findOne({
                where: {
                    email: req.body.email
                }
            });
            if (!userInDB) {
                return res.render('login', { error: 'Usuario no registrado' });
            };

            const validatePw = bcrypt.compareSync(req.body.password, userInDB.password);

            if (validatePw) { // Chequea si la clave es válida. // Acá una vez iniciada la sesion, con session se puede acceder desde cualquier lado.

                if (req.body.rememberme) { // Si se quiere mantener la sesión iniciada
                    res.cookie('email', userInDB.email, { maxAge: 1000 * 60 * 24 }); // Se crea la cookie con fecha de exp.

                } else {
                    console.log('El usuario no se quiere mantener la sesión iniciada');
                }

                req.session.user = userInDB; // Propiedad generada al loguear al usuario
                res.redirect("/");

            } else {
                res.render('login', { error: 'El mail o la contraseña son incorrectos' });
            }

        } catch (error) {
            console.error(error);
            res.redirect('/login/?error=Error interno, vuelva mas tarde');
        }


    },

    profile: (req, res) => {
        const user = req.session.user;
        return res.render('userProfile', { user });

    },


    editProfile: async (req, res) => {
        const user = req.session.user;
        res.render('editProfile', { user })

    },

    updateProfile: async (req, res) => {
        // Para actualizar la contraseña, se debe hacer una ruta aparte solo para la contraseña.

        try {

            const updatedUser = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
                rol_id: req.body.rol_id,
                image: req.file.filename

            };

            await db.User.update(updatedUser, {
                where: {
                    id: req.session.user.id
                }
            });

            // Antes de redireccionar al perfil, consultamos a la BD para obtener los datos actualizados y mostrarlos en la vista del perfil
            req.session.user = await db.User.findByPk(req.session.user.id);

            res.redirect('/profile')

        } catch (error) {
            console.error(error);
        }

    },



    logout: (req, res) => {
        res.clearCookie('email');
        req.session.destroy();
        return res.redirect('/');
    }

    
}

module.exports = userController;