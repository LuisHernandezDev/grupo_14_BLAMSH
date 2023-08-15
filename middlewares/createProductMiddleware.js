const fs = require('fs');

function createProductMiddleware (req, res, next) {
fs.appendFileSync('createProduct.txt', ' Se creó un producto al ingresar en ' + req.url + ' a las ' + new Date + '\n');
next();

}

module.exports = createProductMiddleware;