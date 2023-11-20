window.addEventListener('load', () => {
    const confirmDeleteProduct = document.querySelector('#delete-product');

    if (confirmDeleteProduct) {
        confirmDeleteProduct.addEventListener('submit', async (e) => {
            e.preventDefault();

            const confirmed = confirm('Estás seguro que deseas eliminar el producto?');

            if (confirmed) {

                try {
                    await confirmDeleteProduct.submit();
                    alert('Producto eliminado con éxito');

                } catch (error) {
                    console.error('Error al eliminar el producto:', error);
                    alert('Error al eliminar el producto');
                }
            }
        });
    }
});