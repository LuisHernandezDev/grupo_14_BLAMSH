const db = require("../database/models");
const path = require('path');
const { Op } = require('sequelize');

const { validationResult } = require('express-validator');
const { log, error } = require("console");
const { query } = require("express");

const productController = {

    detalleProducto: (req, res) => {
        res.render('detalleProducto');
    },

    carrito: (req, res) => {
        res.render('carrito');
    },

    editionProduct: async (req, res) => {

        const sizes = await db.Size.findAll()

        res.render('editionProduct', { sizes });

    },

    getList: async (req, res) => {

        try {

            const products = await db.Product.findAll({
                include: ['category', 'sizes'],
                nest: true
            });
            console.log(products.sizes);

            res.render('productList', { products });

        } catch (error) {
            console.error(error);
        }
    },

    getDetail: async (req, res) => {
        const productId = req.params.id; // Se crea una variable con el valor req.params.id para saber el detalle del id buscado en el navegador.

        try {

            const product = await db.Product.findByPk(productId, {
                include: ["category", "sizes"],
                nest: true
            });

            res.render('productDetail', { product });

        } catch (error) {
            console.error(error);
        }

    },

    getCreate: async (req, res) => {
        const sizes = await db.Size.findAll()

        res.render('createProduct', { sizes });

    },

    postProduct: async (req, res) => {

        const resultProductValidation = validationResult(req);
        // res.send(resultProductValidation)

        if (resultProductValidation.errors.length > 0) {
            res.render('createProduct', {
                errors: resultProductValidation.mapped(), // mapped envia los errores a la vista como un objeto
                bodyData: req.body, // Lo usaremos para capturar en el value de la vista, la información que ingresó el usuario y mantenerla.
                sizes: await db.Size.findAll() // Hay que pasar de nuevo size en caso de haber errores para que las tallas sigan apareciendo en la vista
            });
            return
        };

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

            // // Hacemos lo mismo con la talla
            // const sizeNumber = req.body.size

            // let size = await db.Size.findOne({
            //     where: {
            //         size: sizeNumber
            //     }
            // })

            // if (!size) {
            //     size = await db.Size.create({ size: sizeNumber })
            // }

            const newProduct = {
                name: req.body.name,
                description: req.body.description,
                image: req.file.filename,
                price: req.body.price,
                category_id: category.id // Utiliza el ID de la categoría
            };

            const createdProduct = await db.Product.create(newProduct);

            const productSizes = Array.from(req.body.size).map(currentSize => ({
                id_product: createdProduct.dataValues.id, // id del producto recién creado
                id_size: currentSize // id de la talla seleccionada
            }))

            await db.ProductSize.bulkCreate(productSizes) // bulkCreate permite insertar múltiples registros en una tabla

            // await createdProduct.addSize(size);
            console.log(createdProduct);
            console.log(req.body);
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

        const resultEditProductValidation = validationResult(req);
        // res.send(resultProductValidation)

        if (resultEditProductValidation.errors.length > 0) {
            res.render('editProduct', {
                errors: resultEditProductValidation.mapped(), // mapped envia los errores a la vista como un objeto
                bodyData: req.body, // Lo usaremos para capturar en el value de la vista, la información que ingresó el usuario y mantenerla.
                categorys: await db.Category.findAll(),
                product: await db.Product.findByPk(req.params.id),
                sizes: await db.Size.findAll() // Hay que pasar de nuevo size en caso de haber errores para que las tallas sigan apareciendo en la vista
            });
            return
        };        

        try {

            const updatedProduct = {
                name: req.body.name,
                description: req.body.description,
                image: req.file.filename,
                price: req.body.price,
                category_id: req.body.category_id
            };

            await db.Product.update(updatedProduct, {
                where: {
                    id: req.params.id
                }
            });
            console.log(updatedProduct);

            // Eliminamos las tallas antiguas asociadas al producto desde la tabla ProductSize que es donde se guarda el id de la talla asociada al id del producto
            await db.ProductSize.destroy({
                where: {
                    id_product: req.params.id
                }
            });

            const productSizes = Array.from(req.body.id_size).map(sizeId => ({ // Asociamos las nuevas tallas seleccionadas con el producto
                id_product: req.params.id,
                id_size: sizeId
            }));

            await db.ProductSize.bulkCreate(productSizes);

            // await db.ProductSize.update(updatedSize, {
            //     where: {
            //         id_product: req.params.id
            //     }
            // });
            // console.log(updatedSize);

            res.redirect(`/products/${req.params.id}/detail`);

        } catch (error) {
            console.error(error);
        }

    },

    deleteProduct: async (req, res) => {
        const productId = req.params.id;
        try {
            const product = await db.Product.findByPk(productId);

            if (!product) {
                res.send('El producto no existe')
                return error;
            };

            await db.ProductSize.destroy({
                where: {
                    id_product: productId
                }
            });

            product.destroy();

            res.redirect('/products');

        } catch (error) {
            console.error(error);
        }

    },


    searchProducts: async (req, res) => {

        const search = req.query.query; // Obtenemos lo buscado desde la URL
        console.log(req.query);
        try {
            const products = await db.Product.findAll({
                where: {
                    name: {
                        [Op.like]: `%${search}%`
                    }
                }
            });

            if (products.length == 0) {
                res.send("Producto no encontrado");

            } else {
                res.render('searchProduct', { products, search });
            }

        } catch (error) {
            console.log(error);
        }
    }


}

module.exports = productController;