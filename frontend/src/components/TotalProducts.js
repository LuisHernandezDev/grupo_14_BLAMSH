import React, { useEffect, useState } from 'react';
import '../styles/Styles.css'

function TotalProducts() {
    const [totalProducts, setTotalProducts] = useState([])

    useEffect(() => {
        console.log('Se montó el componente');

        async function productsData() {
            try {
                const response = await fetch("http://localhost:3011/api/products")
                const data = await response.json()
                setTotalProducts(data);
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
            {totalProducts.length === 0 ? <p>Cargando...</p> : ''}
           <p> {totalProducts.count}</p>
           
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