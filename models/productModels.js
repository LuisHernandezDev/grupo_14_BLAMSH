const fs = require('fs');
const path = require('path');

const modelo = {
    fileRoute: path.join(__dirname, '../data/products.json'), // Creamos una función con la ruta path para simplificar y no escribir tanto código.

    findAll: () => {
        // Buscamos el contenido del archivo JSON
        const jsonData = fs.readFileSync(modelo.fileRoute, 'utf-8');
        // Convertimos de JSON a JS para que se puede leer.
        const products = JSON.parse(jsonData);

        return products;
    },
    findById: (id) => {
        const products = modelo.findAll(); // No hace falta escribir toda la funcionalidad de nuevo, con llamar a la función findAll es suficiente.
        const selectedProduct = products.find(productoActual => productoActual.id == id); // Usamos el método de array .find el cual trae el elemento que cumple con la condición o trae la primera aparición de lo que busquemos dentro del array.

        return selectedProduct;
    },

    createProduct: (bodyData) => {
        const products = modelo.findAll(); // Acá buscamos el array de productos ya existentes

        const lastProductId = products[products.length - 1].id; // Acá tomamos el id del último producto. 

        const newProduct = {

            id: lastProductId + 1, // Y acá le sumamos 1 al último id.
            ...bodyData // Usamos el spread operator de bodyData para hacer una copia exacta de lo que envía el usuario en el navegador
        };

        products.push(newProduct); // Acá le pusheamos el nuevo producto

        const jsonData = JSON.stringify(products); // Convertimos de JS a JSON para que se pueda guardar en la BD oJSON.

        fs.writeFileSync(modelo.fileRoute, jsonData, 'utf-8'); // Guardamos en el JSON. Usando writeFileSync pasando como primer parámetro la ruta en donde queremos escribir, como segundo parámetro pasamos la data que queremos guardar y como tercer parámetro el idioma utf-8.

        return newProduct;
    },

    destroy: (id) => { // Se pasa por parámetro el campo requerido, en este caso "id" porque es un valor único de los productos.
        let products = modelo.findAll();

        products = products.filter(productoActual => productoActual.id !== id); // Acá filtramos por el id que no es igual para poder eliminar el producto seleccionado

        const jsonProducts = JSON.stringify(products);
        fs.writeFileSync(modelo.fileRoute, jsonProducts, 'utf-8')
    },

    updateProduct: (updatedProduct) => {
        // Buscar array de productos ya existentes.
        let products = modelo.findAll();

        // Conseguir en que índice de ese array, está guardado el producto del id en cuestión.
        const prodIndex = products.findIndex(productoActual => productoActual.id === updatedProduct.id);

        // Modificar el elemento del array en ese índice, por el que nos pasaron por parámetro.
        products[prodIndex] = updatedProduct;

        // Convertir este nuevo array en JSON.
        const productsJson = JSON.stringify(products);

        // Guardar todo al JSON.
        fs.writeFileSync(modelo.fileRoute, productsJson, 'utf-8');


    }

};

module.exports = modelo;