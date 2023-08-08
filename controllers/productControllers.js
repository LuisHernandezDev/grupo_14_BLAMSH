//require path
const path = require('path');

// crear una variable para requerir productModels y poder usar sus funciones en el Controllers
const productModels = require('../models/productModels');


// crear una variable para guadar las routas , es como un objeto que va a contener todas las routas de tu programa.
const controller = {


    detalleProducto: (req, res) => {
        // res.sendFile(path.resolve(__dirname, '../views/detalleProducto.html'));
        res.render('detalleProducto');
    },

    carrito: (req, res) => {
        // res.sendFile(path.resolve(__dirname, '../views/carrito.html'));
        res.render('carrito');
    },


    editionProduct: (req, res) => {
        // res.sendFile(path.resolve(__dirname, '../views/editionProduct.html'));
        res.render('editionProduct');
    },

    getList: (req, res) => {
        const products = productModels.findAll(); // Acá queremos tener un listado de todos los productos

        res.render('productList', { products });
    },

    getDetail: (req, res) => {

        const productId = req.params.id; // Se crea una variable con el valor req.params.id para saber el detalle del id buscado en el navegador.

        const selectedProduct = productModels.findById(productId); // Acá queremos tener un listado de un solo producto // El id o lo que ingrese el usuario en el navegador, se pasa desde el navegador por parámetro a productId mediante el params, y este a su vez va al Models por medio de la función findById y consulta si el id que también fue pasado por parámetro findById: (id) existe o no.

        res.render('ProductDetail', { product: selectedProduct }); // Acá renderizamos la vista del detalle del producto seleccionado y le pasamos el ejs (product) y que reciba el producto seleccionado (selectedProduct).
    },

    getCreate: (req, res) => {
        res.render('createProduct'); // Acá creamos el producto

    },

    postProduct: (req, res) => {
        console.log(req.body);  // Toda la data que el usuario ingresó en el navegador, lo vamos a acceder desde req.body // body es el objeto que createProduct necesita.

        const newProduct = {
            title: req.body.title,
            price: req.body.price
        }

        const createdProduct = productModels.createProduct(newProduct);

        console.log('El nuevo producto tiene como id: ' + createdProduct.id);
        res.redirect('/products/' + createdProduct.id + '/detail');

        // Desde los POST no renderizamos vistas, solo redireccionamos.
        // res.redirect('/products'); 

        // Para que se ejecute esta linea de código, se tiene que ejecutar este controller (postProduct) Para que se ejecute dicho controllers, se tiene que ejecutar su ruta, y para que se ejecute la ruta, el usuario tiene que hacer un post request a /products "router.post('/products', productControllers.postProduct);"
    },

    getEdit: (req, res) => {
        const product = productModels.findById(Number(req.params.id));

        res.render('editProduct', { product });

    },

    deleteProduct: (req, res) => {
        productModels.destroy(Number(req.params.id));

        res.redirect('/products');
    },

    updateProduct: (req, res) => {

        // Una forma de hacerlo pero que el id quede de primero.
        let updatedProduct = {
            id: Number(req.params.id),
        };
        updatedProduct = {
            ...updatedProduct,
            ...req.body
        };

        // Otra forma de hacerlo pero el id queda de último.
        /*
        const updatedProduct = req.body; // Lo que el usuario ingrese en el formulaio, llegará acá mediante el body

        updatedProduct.id = Number(req.params.id); // Acá agregamos el id a lo que el usuario envia pero queda de último.
        */

        productModels.updateProduct(updatedProduct);

        res.redirect('/products/' + updatedProduct.id + '/detail');
    }

};

// exportar el controlador 
module.exports = controller;

