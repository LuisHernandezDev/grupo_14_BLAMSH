const genderOption = document.getElementById('genero-hombre');
const genderOptionTwo = document.getElementById('genero-mujer');
const burgerMenu = document.getElementById('burger-menu');
const option = document.getElementById('hidden-catalog');
let flag = true;




genderOption.addEventListener('click',()=>{

    option.classList.toggle("active");
        
});

genderOptionTwo.addEventListener('click',()=>{

    option.classList.toggle("active");
        
});


burgerMenu.addEventListener('click', ()=>{
    option.classList.toggle("active");
    burgerMenu.toggle('active');
});