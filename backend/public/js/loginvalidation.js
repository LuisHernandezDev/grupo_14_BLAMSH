let userEmail = document.querySelector("[name=email]")
let userPassword = document.querySelector("[name=password]")
const validateEmailformat = e => {
    const field = e.target;
    const fieldValue = e.target.value;
    const regex = new RegExp(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/);
    if (fieldValue.trim().length > 6 && !regex.test(fieldValue)) {
        field.classList.add("invalid");
        field.nextElementSibling.classList.add("error");
        field.nextElementSibling.innerText = `Debes ingresar un ${field.name} valido `

    } else {
        field.classList.remove("invalid");
        field.nextElementSibling.classList.remove("error");
        field.nextElementSibling.innerText = ""

    }




}

const Fieldvalidate = (e) => {
    const field = e.target;
    const fieldValue = e.target.value;
    if (fieldValue.trim().length == 0) {
        field.classList.add("invalid");
        field.nextElementSibling.classList.add("error");
        field.nextElementSibling.innerText = `Debes ingresar un ${field.name} valido `

    } else {
        field.classList.remove("invalid");
        field.nextElementSibling.classList.remove("error");
        field.nextElementSibling.innerText = ""

    }

}

userEmail.addEventListener("input", validateEmailformat)

userEmail.addEventListener('blur', Fieldvalidate);
userPassword.addEventListener('blur', Fieldvalidate);
