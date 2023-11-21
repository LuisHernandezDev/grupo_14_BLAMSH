window.addEventListener('load', () => {
    const confirmDeleteProduct = document.querySelectorAll('.delete-user-form');

    confirmDeleteProduct.forEach(user => {
        user.addEventListener('submit', async (e) => {
            e.preventDefault();

            const confirmed = confirm('¿Estás seguro que deseas eliminar el usuario?');

            if (confirmed) {
                try {
                    await user.submit();
                    alert('Usuario eliminado con éxito');
                } catch (error) {
                    console.error('Error al eliminar el usuario:', error);
                    alert('Error al eliminar el usuario');
                }
            }
        });
    });
});