import React, { useEffect, useState } from 'react';

function TotalProducts() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        console.log('Se montó el componente');

        async function productsData() {
            try {
                const response = await fetch("http://localhost:3011/api/products")
                const data = await response.json()
                setProducts(data.count);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        productsData();
    }, []);

    
    return(
        <div>
            <h1>Total de productos</h1>
            {products.length === 0 ? <p>Cargando...</p> : ''}
            {products}
           
        </div>
    )
    
}
        //  <ul>
        //  {products.length === 0 ? <p>Cargando...</p> : ''}
        //      {Array.from(products).map((product, i) => {
        //          return(
        //              <li key={i}>
        //                  <p>{product.name}</p>
        //                  <p>{product.description}</p>
        //                  <p>{product.price}</p>
        //              </li>
        //          )
        //      })}
        //  </ul>
 
export default TotalProducts;