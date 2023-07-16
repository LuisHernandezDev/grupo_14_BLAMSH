// Requerimos express para para usarlo
const express = require('express');
const path = require('path');
const dotenv=require('dotenv').config();

// Iniciamos un servidor, y lo guardamos dentro de app
const app = express();

app.use(express.static('public'));


// Escuchamos los GET request a "/"
app.get('/', (req, res) => {
    // Respondemos a este request con este string, mediante res.send
    const ruta = path.join(__dirname, './views/detalleProducto.html');
    res.sendFile(ruta);
});

app.get('/carrito', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/carrito.html'));
});



// Hacemos que nuestro servidor escuche requests en el puerto 3000
app.listen(process.env.PORT, () => {
    console.log('Servidor escuchando en el puerto 3000');
});