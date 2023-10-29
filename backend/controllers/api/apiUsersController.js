const { Op } = require('sequelize')
const db = require('../../database/models')
const { use } = require('../../routes/mainRouters')



const apiUserController = {

    getListUser: async (req, res) => {


        try {
            const users = await db.User.findAll({
                attributes: { exclude: ['password', 'identification', 'rol_id', 'phone', 'date_creation', 'image'] }
            });

            let statusCode = 200;
            statusCode = users.length > 0 ? statusCode : 204;

            const urlUserDetail = users.map(user => ({
                ...user.dataValues, // dataValues es una propiedad de sequelize que contiene el objeto con todos los detalles de las columnas de una BD. Copiamos todos los atributos del usuario, es decir, todos los campos.
                userDetail: `${process.env.BASE_URL}/api/users/${user.id}/detail` // URL para obtener el detalle del usuario
            }));

            const response = {
                users: urlUserDetail,
                meta: {
                    status: statusCode,
                    count: users.length,
                    url: req.originalUrl
                }
            }
            res.status(statusCode).json(response)

        } catch (error) {
            res.status(500).json({ error: 'Error 500' })
        }
    },

    getDetailById: async (req, res) => {

        try {

            const user = await db.User.findByPk(req.params.id, {
                attributes: { exclude: ['password', 'identification', 'rol_id', 'phone', 'date_creation'] }
            })

            user.image = process.env.URL_IMAGE_USERS + user.image;

            const response = {
                user: user,
                meta: {
                    status: 201,
                    count: user.length,
                    url: req.originalUrl
                }
            }

            res.json(response)

        } catch (error) {
            console.error(error)
            res.json('No existe usuario')
        }

    },

    getDetailByName: async (req, res) => {

        try {

            const searchByName = await db.User.findAll({
                attributes: { exclude: ['password', 'identification', 'rol_id', 'phone', 'date_creation', 'image'] },
                where: {
                    firstName: {
                        [Op.like]: `%${req.query.firstName}%`
                    }
                }
            })

            const urlUserDetail = searchByName.map(user => ({
                ...user.dataValues, // dataValues es una propiedad de sequelize que contiene el objeto con todos los detalles de las columnas de una BD. Copiamos todos los atributos del usuario, es decir, todos los campos.
                userDetail: `${process.env.BASE_URL}/api/users/${user.id}/detail` // URL para obtener el detalle del usuario
            }));

            const response = {
                data: urlUserDetail,
                meta: {
                    status: 201,
                    count: searchByName.length,
                    url: req.originalUrl,
                    query: req.query

                }
            }

            res.json(response);

        } catch (error) {
            console.error(error)
        }
    }


}

module.exports = apiUserController;