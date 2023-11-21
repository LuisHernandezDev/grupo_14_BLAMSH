window.addEventListener('load', () => { // El evento load espera que todos los recursos se carguen para luego dispararse.

    const formulario = document.querySelector('#register-form');

    const inputPassword = document.querySelector('#password');
    const eye = document.querySelector('#eye-open-close');
    let checkeado = false;

    eye.addEventListener('click', e => {
        checkeado = !checkeado;
        console.log('ckeck click ' + checkeado);
        if (checkeado) {
            inputPassword.type = 'text';
            eye.classList.remove('fa-eye-slash'); // Icono de FontAwesome que representa un ojo cerrado. Oculta la contraseña
            eye.classList.add('fa-eye'); // Icono de FontAwesome que representa un ojo abierto. Muestra la contraseña
        } else {
            inputPassword.type = 'password';
            eye.classList.remove('fa-eye'); // Muestra la contraseña
            eye.classList.add('fa-eye-slash'); // Oculta la contraseña
        }
    })

    formulario.addEventListener('submit', (e) => {

        const errors = [];

        const inputFirstName = document.querySelector('#firstName');
        const errorFirstName = document.querySelector('#error-firstName')
        const regExpName = /^[A-Za-z]+$/;

        if (inputFirstName.value == "") {
            errors.push("Debes escribir un nombre")
            errorFirstName.textContent = "Debes escribir un nombre"
        } else if (inputFirstName.value.length < 2) {
            errors.push("El nombre debe tener al menos 2 caracteres")
            errorFirstName.textContent = "El nombre debe tener al menos 2 caracteres"
        }
        else if (!regExpName.test(inputFirstName.value)) {
            errors.push('El campo nombre debe tener solo letras')
            errorFirstName.textContent = 'El campo nombre debe tener solo letras';
        }
        else {
            errorFirstName.textContent = ""; // Limpiamos el error para que desaparezca si se escribe lo correcto en el campo
        }

        const inputLastName = document.querySelector('#lastName');
        const errorLastName = document.querySelector('#error-lastName')

        if (inputLastName.value == "") {
            errors.push("Debes escribir un apellido")
            errorLastName.textContent = "Debes escribir un apellido"
        } else if (inputLastName.value.length < 2) {
            errors.push("El apellido debe tener al menos 2 caracteres")
            errorLastName.textContent = "El apellido debe tener al menos 2 caracteres"
        } else {
            errorLastName.textContent = "";
        }

        const inputEmail = document.querySelector('#email');
        const errorEmail = document.querySelector('#error-email')
        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/; // Usando Expresion Regular

        if (inputEmail.value == "") {
            errors.push("Debes escribir un correo electrónico")
            errorEmail.textContent = "Debes escribir un correo electrónico"
        } else if (!validEmail.test(inputEmail.value)) { // Sí el email no coincide con el formato de expresión regular (.test devuelve true o false)
            errors.push("Debes ingresar un formato de correo válido")
            errorEmail.textContent = "Debes ingresar un formato de correo válido"
        } else {
            errorEmail.textContent = "";
        }

        const inputPhone = document.querySelector('#phone');
        const errorPhone = document.querySelector('#error-phone')

        if (inputPhone.value == "") {
            errors.push("Debes ingresar un número de teléfono")
            errorPhone.textContent = "Debes ingresar un número de teléfono"
        } else {
            errorPhone.textContent = "";
        }

        const inputImage = document.querySelector('#image');
        const errorImage = document.querySelector('#error-image')
        const allowedExt = /(\.jpg|\.jpeg|\.png|\.gif)$/i; // Extensiones permitidas

        if (inputImage.value == "") {
            errors.push("Debes subir una imagen")
            errorImage.textContent = "Debes subir una imagen"
        } else if (!allowedExt.exec(inputImage.value)) { // .exec es un metodo de Reg.Exp que busca una coincidencia, si no encuentra devuelve null.
            errors.push("Las extensiones de archivos permitidas son .jpg, .jpeg, .png, .gif")
            errorImage.textContent = "Las extensiones de archivos permitidas son .jpg, .jpeg, .png, .gif"
        } else {
            errorImage.textContent = "";
        }

        const inputPassword = document.querySelector('#password');
        const errorPassword = document.querySelector('#error-password')
        const validatePw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#$%^&*()_+-]).{8,}$/;

        if (inputPassword.value == "") {
            errors.push("'Debes ingresar una contraseña")
            errorPassword.textContent = "Debes ingresar una contraseña"
        } else if (inputPassword.value.length < 9) {
            errors.push("La contraseña debe tener al menos 8 caracteres")
            errorPassword.textContent = "La contraseña debe tener al menos 8 caracteres"
        } else if (!validatePw.test(inputPassword.value)) { // Preguntamos sí no cumple con lo indicado
            errors.push("La contraseña debe tener al menos 8 caracteres, letras mayúsculas, minúsculas, números y caracteres especiales")
            errorPassword.textContent = "La contraseña debe tener al menos 8 caracteres, letras mayúsculas, minúsculas, números y caracteres especiales"
        } else {
            errorPassword.textContent = "";
        }

        const inputOpcion1 = document.querySelector('#opcion1');
        const errorCheckbox = document.querySelector('#error-checkbox')

        if (!inputOpcion1.checked) {
            errors.push("Debes aceptar las políticas de privacidad y los términos")
            errorCheckbox.textContent = "Debes aceptar las políticas de privacidad y los términos"
        } else {
            errorCheckbox.textContent = "";
        }


        if (errors.length > 0) { // Preguntamos sí hay errores
            e.preventDefault(); // Prevenimos el envío del formulario

            // let errorsList = document.querySelector('div.errors')
            // for (let i = 0; i < errors.length; i++) {
            //     errorsList.innerHTML +="<p>" + errors[i] + "</p>"
            //     errorsList.classList.add('errors')

            // }
        }

    })

});
