import React, { useEffect, useState } from 'react';


function ProductsList() {
    const [productsList, setProductsList] = useState([])

    useEffect(() => {
        console.log('Se montó el componente');

        async function productsListData() {

            try {
                const response = await fetch('http://localhost:3011/api/products/list');
                const data = await response.json();
                setProductsList(data)
                console.log(data);
                
            } catch (error) {
                console.log(error);
            }
        }
        productsListData()

    }, []);

    return (
        <ul className='product-list'>
            {productsList.length === 0 ? <p>Cargando...</p> : ""}
            {productsList.map((product, i) => {
                return(
                <li key={i} className="product-item">                   
                    <h3>{product.name}</h3>
                    <h3>{product.description}</h3>
                    <h3>{'$' + product.price}</h3>
                    <img className='img-product-detail' src={product.image} alt="" />
                </li>
                )
            })}
        </ul>
    )
}

export default ProductsList;