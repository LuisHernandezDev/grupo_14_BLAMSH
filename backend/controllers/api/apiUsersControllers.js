const { Op } = require('sequelize')
const db = require('../../database/models')
const { use } = require('../../routes/mainRouters')



const apiUserControllers = {
    
    getListUser: async (req, res) => {
        
        try {
            const users = await db.User.findAll({
                attributes: { exclude: ['password', 'identification', 'rol_id', 'phone', 'date_creation'] }
            })

            const response = {
                users: users,
                meta: {
                    status: 201,
                    count: users.length,
                    url: req.originalUrl
                }
            }
            res.json(response)

        } catch (error) {
            console.error(error)
        }
    },

    getDetailById: async (req, res) => {

        try {

            const user = await db.User.findByPk(req.params.id, {
                attributes: { exclude: ['password', 'identification', 'rol_id', 'phone', 'date_creation'] }
            })

            const baseUrl = 'http://localhost:3011/images/users/';

            user.image = baseUrl + user.image;
            
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
                attributes: { exclude: ['password', 'identification', 'rol_id', 'phone', 'date_creation'] },
                where: {
                    firstName: {
                        [Op.like]: `%${req.query.firstName}%`
                    }
                }
            })
            const response = {
                data: searchByName,
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

module.exports = apiUserControllers;