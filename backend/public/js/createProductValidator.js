window.addEventListener('load', () => {

    const formulario = document.querySelector('#create-form');

    formulario.addEventListener('submit', (e) => {
       
        const errors = [];

        const inputNameProduct = document.querySelector('#name');
        const errorNameProduct = document.querySelector('#error-name-product');

        if (inputNameProduct.value == "") {
            errors.push('Debes ingresar el nombre del producto!!!');
            errorNameProduct.textContent = 'Debes ingresar el nombre del producto!!!';
        } else if (inputNameProduct.value.length < 5) {
            errors.push('El nombre debe tener al menos 5 caracteres!!!')
            errorNameProduct.textContent = 'El nombre debe tener al menos 5 caracteres!!!'
        } else {
            errorNameProduct.textContent = ""; // Limpiamos el error para que desaparezca si se escribe lo correcto en el campo

        }

        const inputDescriptionProduct = document.querySelector('#description');
        const errorDescriptionProduct = document.querySelector('#error-description-product');

        if (inputDescriptionProduct.value == "") {
            errors.push('Debes ingresar la descripción del producto!!!');
            errorDescriptionProduct.textContent = 'Debes ingresar la descripción del producto!!!';
            console.log(inputDescriptionProduct);
        } else if (inputDescriptionProduct.value.length < 20) {
            errors.push('La descripción debe tener al menos 20 caracteres!!!');
            errorDescriptionProduct.textContent = 'La descripción debe tener al menos 20 caracteres!!!';
        } else {
            errorDescriptionProduct.textContent = "";
        }

        const inputCategoryProduct = document.querySelector('#category');
        const errorCategoryProduct = document.querySelector('#error-category-product');

        if (inputCategoryProduct.value == "") {
            errors.push('Debes escoger la categoría del producto!!!');
            errorCategoryProduct.textContent = 'Debes escoger la categoría del producto!!!';
        } else {
            errorCategoryProduct.textContent = ""
        }


        const inputSizeProduct = document.querySelector('#size');
        const errorSizeProduct = document.querySelector('#error-size-product');

        if (inputSizeProduct.value == "") {
            errors.push('Debes seleccionar al menos una talla!!!');
            errorSizeProduct.textContent = 'Debes seleccionar al menos una talla!!!';
        } else {
            errorSizeProduct.textContent = ""
        }


        const inputPriceProduct = document.querySelector('#price');
        const errorPriceProduct = document.querySelector('#error-price-product');
        const regExpPrice = /^\d+$/; // Exp. Reg. verifica que solo deben ser números.

        if (inputPriceProduct.value == "") {
            errors.push('Debes ingresar el precio del producto!!!')
            errorPriceProduct.textContent = 'Debes ingresar el precio del producto!!!';
        } else if (!regExpPrice.test(inputPriceProduct.value)) { // .test es un método Reg. Exp que devuelve true o false
            errors.push('El precio debe tener solo números!!!')
            errorPriceProduct.textContent = 'El precio debe tener solo números!!!'
        } else {
            errorPriceProduct.textContent = ""
        }


        const inputImageProduct = document.querySelector('#image');
        const errorImageProduct = document.querySelector('#error-image-product');
        const allowedExt = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

        if (inputImageProduct.value == "") {
            errors.push('Debes agregar una imagen!!!');
            errorImageProduct.textContent = 'Debes agregar una imagen!!!';
        } else if (!allowedExt.exec(inputImageProduct.value)) {
            errors.push('Las extensiones de archivos permitidas son .jpg, .jpeg, .png, .gif!!!')
            errorImageProduct.textContent = 'Las extensiones de archivos permitidas son .jpg, .jpeg, .png, .gif!!!';
        } else {
            errorImageProduct.textContent = "";
        }


        if (errors.length > 0) {
            e.preventDefault();
        }

    });

});