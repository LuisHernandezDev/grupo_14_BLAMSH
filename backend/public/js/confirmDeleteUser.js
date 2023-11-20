window.addEventListener('load', () => {
    const confirmDeleteUser = document.querySelector('#delete-user');

    if (confirmDeleteUser) {
        confirmDeleteUser.addEventListener('submit', async (e) => {
            e.preventDefault();

            const confirmed = confirm('Estás seguro que deseas eliminar el usuario?');

            if (confirmed) {

                try {
                    await confirmDeleteUser.submit();
                    alert('Usuario eliminado con éxito');

                } catch (error) {
                    console.error('Error al eliminar el usuario:', error);
                    alert('Error al eliminar el usuario');
                }
            }
        });
    }
});