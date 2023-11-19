import React, { useEffect, useState } from 'react';


function ProductsList() {
    const [productsList, setProductsList] = useState([])
    const [totalProducts, setTotalProducts] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        console.log('Se montó el componente');

        async function productsListData() {

            try {
                const response = await fetch(`http://localhost:3011/api/products/list?page=${page}`);
                const data = await response.json();
                setProductsList(data)
                console.log(data);

            } catch (error) {
                console.log(error);
            }
        }
        productsListData();

        async function fetchTotalProducts() {
            try {
                const response = await fetch('http://localhost:3011/api/products');
                const data = await response.json();
                setTotalProducts(data.count);
            } catch (error) {
                console.log(error);
            }
        }
        fetchTotalProducts();
    }, [page]);

    useEffect(() => {
        console.log("Se actualizó el componente");
    }, [productsList]);


    useEffect(() => {
        return () => console.log('Se desmontó el componente');

    }, []);

    return (
        <div>
            <h1>Listado de productos</h1>
            <ul className='product-list'>
                {productsList.length === 0 ? <p>Cargando...</p> : ""}
                {productsList.map((product, i) => {
                    return (
                        <li key={i} className="product-item">
                            <p>{product.id}</p>
                            <h3>{product.name}</h3>
                            <h3>{product.description}</h3>
                            <h3>{'$' + product.price}</h3>
                            <p>Tallas: {product.sizes.map((size) => size.size).join(', ')}</p>
                            <img className='img-product-detail' src={product.image} alt="" />
                        </li>
                    )
                })}
            </ul>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>Anterior</button>
            <button onClick={() => setPage(page + 1)} disabled={productsList.length === 0 || page * 5 >= totalProducts}>Siguiente</button>
        </div>
    )
}

export default ProductsList;