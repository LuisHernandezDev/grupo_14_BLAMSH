// Requerimos express para para usarlo
const express = require('express');
//Requerimos methodOverride para usar put y delete
const methodOverride = require('method-override');
const path = require('path');
const dotenv = require('dotenv').config();
const session = require('express-session')
const cookieParser = require('cookie-parser');

//require mainrouter 
const mainRouter = require('./routes/mainRouters');
const userRouter = require('./routes/userRouters');
const productRouter = require('./routes/productRouters');
const apiUsersRouter = require('./routes/api/apiUsersRouters');

/* const logMiddleware = require('./middlewares/logMiddleware');*/
const authMiddleware = require('./middlewares/authMiddleware');
const db = require('./database/models');

// Iniciamos un servidor, y lo guardamos dentro de app
const app = express();

app.set('view engine', 'ejs');

app.set('views', [
    path.join(__dirname, './views'),

]);

// Usa los recursos estaticos de la carpeta public
app.use(express.static('public'));

app.use(session({ 
    secret: 'shhhhhh!!!',
    resave: false,
    saveUninitialized: true }))

app.use(authMiddleware.checkIsloggedIn);
app.use(authMiddleware.isAdmin);


/* app.use(logMiddleware);*/

// Le decimos a la aplicación que todo lo que llegue desde un formulario vía post, queremos capturarlo en objeto literal y a su vez convertirlo en JSON si se quiere. 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.use( async (req, res, next) => {
    if (req.cookies.email) { // Si hay un email guardado en cookies, mediante el modelo, buscamos los datos del usuario guardado en la cookie y lo guardamos en session

        try {

            const user = await db.User.findOne({
                where: {
                    email: req.cookies.email
                }
            });

            if (user) {
                req.session.user = user;
            }
            
        } catch (error) {
            console.error(error);
        }

    }
    next(); // Si no hay cookie de email, no se hace nada.
})

app.use(methodOverride('_method'));


// avisar al servido que tiene que usar mainrouter 
app.use('/', mainRouter);
app.use('/', userRouter);
app.use('/', productRouter);
app.use('/', apiUsersRouter);

app.use((req, res) => {
    res.render('error-404');
});

/* 
Vistas - Son la parte visual, es donde mostramos la info al usuario.
Controllers - Son quienes responden a los pedidos, y también pueden renderizar vistas.
Modelos - Son quienes comunican a los controlles con el archivo JSON o BD. Juntos nos dan funciones para manipular la data del mismo.
JSON - Es el archivo donde guardamos data para que se mantenga.
*/


app.listen(process.env.PORT || 3011, () => {
    console.log('Servidor escuchando en el puerto' + ' ' + process.env.PORT + ' http://localhost:3011/');
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