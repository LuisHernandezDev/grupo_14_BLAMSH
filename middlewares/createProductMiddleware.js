const fs = require('fs');

function createProductMiddleware (req, res, next) {
fs.appendFileSync('createProduct.txt', ' Se creó un producto al ingresar en ' + req.url + '\n');
next();

}

module.exports = createProductMiddleware;