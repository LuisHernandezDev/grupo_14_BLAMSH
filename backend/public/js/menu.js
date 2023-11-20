window.addEventListener('load', () => {
    const profile = document.querySelector('#user-menu #profile');
    const menu = document.querySelector('#menu')
    
    profile.addEventListener('click', () => {
        menu.classList.toggle("mostrar")
    })
    
    console.log(menu);

});