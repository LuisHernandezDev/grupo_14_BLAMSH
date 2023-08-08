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
        const products = modelo.findAll();

        const lastProductId = products[products.length - 1].id; // Acá tomamos el id del último producto. 

        const newProduct = {
            id: lastProductId + 1, // Y acá le sumamos 1 al último id.
            ...bodyData // Usamos el spread operator de bodyData para hacer una copia exacta de lo que envía el usuario en el navegador
        }

        products.push(newProduct);

        const jsonData = JSON.stringify(products); // Convertimos de JS a JSON para que se pueda guardar en la BD.

        fs.writeFileSync(modelo.fileRoute, jsonData, 'utf-8'); // Guardamos en el JSON. Usando writeFileSync pasando como primer parámetro en donde queremos escribir, segundo parámetro, pasamos la data que queremos guardar y como tercer parámetro el idioma utf-8.
    }

};

module.exports = modelo;