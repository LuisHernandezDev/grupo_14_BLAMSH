const fs = require('fs');
const path = require('path');

const productModel = {
    productRoute : path.join(__dirname, '../data/data.json'),
    getDataProduct : () => {
       return JSON.parse(fs.readFileSync(productModel.productRoute, 'utf-8'));
    },

    getDataProductById: (id) => {
        return productModel.getDataProduct().find(product => product.id === id);
    }
}

module.exports = productModel;