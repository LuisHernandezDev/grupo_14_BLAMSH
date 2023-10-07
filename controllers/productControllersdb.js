const db = require("../database/models");
const path = require('path');
const { Op } = require('sequelize');

const { validationResult } = require('express-validator');
const { log, error } = require("console");

const productController = {

    detalleProducto: (req, res) => {
        res.render('detalleProducto');
    },

    carrito: (req, res) => {
        res.render('carrito');
    },

    editionProduct: (req, res) => {
        res.render('editionProduct');
    },

    getList: async (req, res) => {

        try {
            const products = await db.Product.findAll({
                raw: true,
                include: ['category', 'sizes'],
                nest: true
            });

            res.render('productList', { products });

        } catch (error) {
            console.error(error);
        }
    },

    getDetail: async (req, res) => {
        const productId = req.params.id; // Se crea una variable con el valor req.params.id para saber el detalle del id buscado en el navegador.

        try {
            const product = await db.Product.findByPk(productId, {
                raw: true,
                include: ["category", "sizes"],
                nest: true
            });

            res.render('productDetail', { product });

        } catch (error) {
            console.error(error);
        }

    },

    getCreate: (req, res) => {
        res.render('createProduct');

    },

    postProduct: async (req, res) => {
        try {
            const categoryName = req.body.category; // Obtenemos el nombre de la categoría desde el formulario

            // Buscamos la categoría en la tabla de categorías o crea una nueva si no existe
            let category = await db.Category.findOne({
                where: {
                    category: categoryName
                }
            });

            if (!category) {
                category = await db.Category.create({ category: categoryName });
            }

            // Hacemos lo mismo con la talla
            const sizeNumber = req.body.size

            let size = await db.Size.findOne({
                where: {
                    size: sizeNumber
                }
            })

            if (!size) {
                size = await db.Size.create({ size: sizeNumber })
            }

            const newProduct = {
                name: req.body.name,
                description: req.body.description,
                image: req.file.filename,
                price: req.body.price,
                size: req.body.size,
                category_id: category.id // Utiliza el ID de la categoría
            };

            const createdProduct = await db.Product.create(newProduct);

            await createdProduct.addSize(size);
            console.log(createdProduct);

            res.redirect(`/products/${createdProduct.id}/detail`);

        } catch (error) {
            console.error(error);
        }

    },

    getEdit: async (req, res) => {

        try {

            const product = await db.Product.findByPk(req.params.id, {
                include: "sizes",
                nest: true
            });

            const categorys = await db.Category.findAll();

            const sizes = await db.Size.findAll();

            res.render('editProduct', { product, categorys, sizes });

        } catch (error) {
            console.error(error);
        }

    },


    updateProduct: async (req, res) => {

        try {

            const updatedProduct = {
                name: req.body.name,
                description: req.body.description,
                image: req.file.filename,
                price: req.body.price,
                category_id: req.body.category_id
            };

            const updatedSize = {
                id_size: req.body.id_size
            };

            await db.Product.update(updatedProduct, {
                where: {
                    id: req.params.id
                }
            });
            console.log(updatedProduct);

            await db.ProductSize.update(updatedSize, {
                where: {
                    id_product: req.params.id
                }
            });
            console.log(updatedSize);

            res.redirect(`/products/${req.params.id}/detail`);

        } catch (error) {
            console.error(error);
        }

    },

    deleteProduct: async (req, res) => {
        const productId = req.params.id;
        try {
            const product = await db.Product.findByPk(productId, {
                include: ["category", "sizes"],
                nest: true
            });

            if (!product) {
                res.send('El producto no existe')
                return error;
            };

            await db.Product.destroy({
                where: {
                    id: productId
                },
                force: true

            });

            res.redirect('/products');

        } catch (error) {
            console.error(error);
        }

    },


    searchProducts: async (req, res) => {

        const query = req.query.query; // Obtenemos lo buscado desde la URL

        try {
            const products = await db.Product.findAll({
                where: {
                    name: {
                        [Op.like]: `%${query}%`
                    }
                }
            });

            res.render('searchProduct', { products, query });

        } catch (error) {
            res.send("Producto no encontrado")
        }

    }


}

module.exports = productController;