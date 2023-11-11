const db = require('../../database/models');
const { Op } = require('sequelize')


const apiProductsController = {

    getListProductPaginated: async (req, res) => {

        try {

            const page = Number(req.query.page) || 1; // Obtenemos el número de página por query y lo convertimos a number
            const limit = 10; // Número de registros que se van a mostrar por página
            const offset = (page - 1) * limit; // Formula para calcular el número de registros que se van a saltar. 

            const products = await db.Product.findAll({
                attributes: { exclude: ['category_id', 'image'] },
                include: ['category'],
                limit: limit,
                offset: offset
            });

            let statusCode = 200;
            statusCode = products.length > 0 ? statusCode : 204;

            const countByCategory = {};

            // Cuantos productos hay en cada categoría
            products.forEach(product => {
                const categoryName = product.category.category; // Accedemos al nombre de la categoria y la guardamos en una variable
                countByCategory[categoryName] = (countByCategory[categoryName] || 0) + 1; // Actualizamos el objeto countByCategory para saber el número de productos por categoría. Validamos si existe un valor para dicha categoria. Se debe inicializar countByCategory[categoryName] en 0 antes de incrementarlo, de lo contrario dará null
            });

            const urlUserDetail = products.map(product => ({
                ...product.dataValues, // dataValues es una propiedad de sequelize que contiene el objeto con todos los detalles de las columnas de una BD. Copiamos todos los atributos del usuario, es decir, todos los campos.
                productDetail: `${process.env.BASE_URL}/api/products/${product.id}/detail` // URL para obtener el detalle del usuario
            }));

            const quantity = await db.Product.findAndCountAll(); // Buscar y contar todos. Obtenemos la cantidad total de registros en la tabla de productos

            const count = quantity.count; // count es una propiedad de findAndCountAll que devuelve el número total de registros que coinciden con la consulta
            console.log(quantity.count);

            const totalPages = Math.ceil(count / limit); // Dividimos la cantidad total de registros por el número de registros que se van a mostrar por página... La función Math.ceil redondea hacia arriba. Asegura tener suficientes páginas para mostrar todos los registros.

            const response = {
                count: count,
                quantityForPage: products.length,
                countByCategory,
                products: urlUserDetail,
                meta: {
                    status: statusCode,
                    url: req.originalUrl,
                    nextPage: page < totalPages ? `${process.env.BASE_URL}/api/products?page=${page + 1}` : null,
                    previousPage: page > 1 ? `${process.env.BASE_URL}/api/products?page=${page - 1}` : null,
                }
            }

            res.status(statusCode).json(response);


        } catch (error) {
            res.status(500).json({ error: 'Error 500' })
        }

    },

    getDetailById: async (req, res) => {

        try {
            const product = await db.Product.findByPk(req.params.id, {
                include: ['category', 'sizes']
            })

            product.image = process.env.URL_IMAGE_PRODUCTS + product.image;

            res.json(product)

        } catch (error) {
            res.status(500).json({ error: 'Error 500' })
        }

    },

    getDetailByName: async (req, res) => {

        try {
            const searchByName = await db.Product.findAll({
                where: {
                    name: {
                        [Op.like]: `%${req.query.name}%`
                    }
                }
            });

            let statusCode = 200;
            statusCode = searchByName.length > 0 ? statusCode : 204;

            const urlProductDetail = searchByName.map(product => ({
                ...product.dataValues, // dataValues es una propiedad de sequelize que contiene el objeto con todos los detalles de las columnas de una BD. Copiamos todos los atributos del usuario, es decir, todos los campos.
                productDetail: `${process.env.BASE_URL}/api/products/${product.id}/detail` // URL para obtener el detalle del usuario
            }));
            console.log(urlProductDetail);

            const response = {
                data: urlProductDetail,
                meta: {
                    status: statusCode,
                    count: searchByName.length,
                    url: req.originalUrl,
                    query: req.query

                }
            }
            res.status(statusCode).json(response)

        } catch (error) {
            res.status(500).json({ error: 'Error 500' })
        }
    },

    getLastProduct: async (req, res) => {

        try {
            const lastProduct = await db.Product.findAll({
                include: ['category', 'sizes'],
                limit: 1,
                order: [['id', 'DESC']]

            })

            lastProduct[0].image = process.env.URL_IMAGE_PRODUCTS + lastProduct[0].image;

            res.json(lastProduct)
        } catch (error) {
            res.status(500).json({ error: 'Error 500' })
        }
    },

    getListProduct: async (req, res) => {
        try {
            const page = req.query.page || 1;
            const productsList = await db.Product.findAll({
                include: ['category', 'sizes'],
                exclude: ['id', 'category_id'],
                limit: 5,
                offset: (page - 1) * 5 // Formula para calcular el número de registros que se van a saltar. 
            })
            
            productsList.forEach(product => {
                product.image = process.env.URL_IMAGE_PRODUCTS + product.image
            })

            res.json(productsList)
        } catch (error) {
            res.status(500).json({ error: 'Error 500' })
        }
    }
}

module.exports = apiProductsController;