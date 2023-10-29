const db = require('../../database/models');


const apiProductsController = {

    getListProduct: async (req, res) => {

        try {

            const products = await db.Product.findAll({
                attributes: { exclude: ['category_id', 'image', 'price'] },
                include: ['category']
            });

            let statusCode = 200;
            statusCode = products.length > 0 ? statusCode : 204;

            const countByCategory = {};

            products.forEach(product => {
                const categoryName = product.category.category;
                countByCategory[categoryName] = (countByCategory[categoryName] || 0) + 1; // Se debe inicializar countByCategory[categoryName] en 0 antes de incrementarlo, de lo contrario dará null
            });

            const urlUserDetail = products.map(product => ({
                ...product.dataValues, // dataValues es una propiedad de sequelize que contiene el objeto con todos los detalles de las columnas de una BD. Copiamos todos los atributos del usuario, es decir, todos los campos.
                productDetail: `${process.env.BASE_URL}/api/products/${product.id}/detail` // URL para obtener el detalle del usuario
            }));

            const response = {
                count: products.length,
                countByCategory: countByCategory,
                products: urlUserDetail,
                meta: {
                    status: statusCode,
                    url: req.originalUrl,
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


    }

}

module.exports = apiProductsController;