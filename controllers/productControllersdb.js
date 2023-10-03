const db = require("../database/models");
const path = require('path');
const { Op } = require('sequelize');

const { validationResult } = require('express-validator');
const { log } = require("console");

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
                include: ['category', 'sizes'],
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

            // Busca la categoría en la tabla de categorías o crea una nueva si no existe
            let category = await db.Category.findOne({ where: { category: categoryName } });

            if (!category) {
                category = await db.Category.create({ category: categoryName });
            }

            // Crea el producto utilizando el nombre de la categoría
            const newProduct = {
                name: req.body.name,
                description: req.body.description,
                image: req.file.filename,
                price: req.body.price,
                size: req.body.size,
                category_id: category.id // Utiliza el ID de la categoría
            };

            const createdProduct = await db.Product.create(newProduct, {
                raw: true,
                include: 'sizes',
                nest: true
            });

            res.redirect('/products/' + createdProduct.id + '/detail');

        } catch (error) {
            console.error(error);
        }

    },

    getEdit: async (req, res) => {

        try {

            const product = await db.Product.findByPk(req.params.id);

            const categorys = await db.Category.findAll()

            res.render('editProduct', { product, categorys });

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
                size: req.body.size,
                category_id: category.id
            };

            await db.Product.update(updatedProduct, {
                where: {
                    id: req.params.id
                }
            });

            res.redirect(`/products/${req.params.id}/detail`);

        } catch (error) {
            console.error(error);
        }
    },


}

module.exports = productController;