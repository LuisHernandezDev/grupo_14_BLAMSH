const { Op } = require('sequelize')
const db = require('../../database/models')
const { use } = require('../../routes/mainRouters')



const apiUserController = {

    getListUser: async (req, res) => {


        try {

            const page = Number(req.query.page) || 1;
            const limit = 10;
            const offset = (page -1) * limit;


            const users = await db.User.findAll({
                attributes: { exclude: ['password', 'identification', 'rol_id', 'phone', 'date_creation', 'image'] },
                limit: limit,
                offset: offset
            });

            let statusCode = 200;
            statusCode = users.length > 0 ? statusCode : 204;

            const urlUserDetail = users.map(user => ({
                ...user.dataValues, // dataValues es una propiedad de sequelize que contiene el objeto con todos los detalles de las columnas de una BD, es decir, trae un objeto por cada usuario. Copiamos todos los atributos del usuario, es decir, todos los campos.
                userDetail: `${process.env.BASE_URL}/api/users/${user.id}/detail` // URL para obtener el detalle del usuario
            }));

            console.log(users); // Acá fue donde vimos la propiedad dataValues

            // 1.- Primero buscamos los registros y los contamos.
            // 2.- Obtenemos el total de los registros
            // 3.- Dividimos el total de los registros entre el limit y lo redondeamos hacia arriba

            const quantity = await db.User.findAndCountAll(); // Buscar y contar todos. Obtenemos la cantidad total de registros en la tabla de productos

            const totalQuantity = quantity.count; // count es una propiedad de findAndCountAll que devuelve el número total de registros que coinciden con la consulta
            console.log(quantity.count);

            const totalPages = Math.ceil(totalQuantity / limit); // Dividimos la cantidad total de registros por el número de registros que se van a mostrar por página... La función Math.ceil redondea hacia arriba. Asegura tener suficientes páginas para mostrar todos los registros.

            const response = {
                totalQuantity: totalQuantity,
                quantityForPage: users.length,
                users: urlUserDetail,
                meta: {
                    status: statusCode,
                    url: req.originalUrl,
                    nextPage: page < totalPages ? `${process.env.BASE_URL}/api/users?page=${page + 1}` : null,
                    previousPage: page > 1 ? `${process.env.BASE_URL}/api/users?page=${page - 1}` : null,
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