// Requerimos express para para usarlo
const express = require('express');
//Requerimos methodOverride para usar put y delete
const methodOverride = require('method-override');
const path = require('path');
const dotenv = require('dotenv').config();

// Iniciamos un servidor, y lo guardamos dentro de app
const app = express();


//require mainrouter 
const mainRouter = require('./routes/mainRouters');

const userRouter = require('./routes/userRouters');

const productRouter = require('./routes/productRouters');

const logMiddleware = require('./middlewares/logMiddleware');


app.set('view engine', 'ejs');

app.set('views', [
    path.join(__dirname, './views'),

]);

app.use(logMiddleware);

// Usa los recursos estaticos de la carpeta public
app.use(express.static('public'));

// Le decimos a la aplicación que todo lo que llegue desde un formulario, queremos capturarlo en objeto literal y a su vez convertirlo en JSON si se quiere. 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));


// avisar al servido que tiene que usar mainrouter 
app.use('/', mainRouter);
app.use('/', userRouter);
app.use('/', productRouter);

app.use((req, res) => {
    res.send ('Error 404 - Not found')
})

/* 
Vistas - Son la parte visual, es donde mostramos la info al usuario.
Controllers - Son quienes responden a los pedidos, y también pueden renderizar vistas.
Modelos - Son quienes comunican a los controlles con el archivo JSON o BD. Juntos nos dan funciones para manipular la data del mismo.
JSON - Es el archivo donde guardamos data para que se mantenga.
*/


app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor escuchando en el puerto' + ' ' + process.env.PORT + ' http://localhost:3000/');
});








// Escuchamos los GET request a "/"
/* app.get('/', (req, res) => {
    // Respondemos a este request con este string, mediante res.send
    const ruta = path.join(__dirname, './views/home.html');
    res.sendFile(ruta);
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/register.html'));
});

app.get('/detalleProducto', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/detalleProducto.html'));
});

app.get('/carrito', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/carrito.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/login.html'));
});
 */


// Hacemos que nuestro servidor escuche requests en el puerto 3000