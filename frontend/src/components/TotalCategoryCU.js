import React, { useEffect, useState } from 'react';
import '../styles/Styles.css'

function TotalCategoryCU() {
    const [totalProductsCU, setTotalProductsCU] = useState([])

    useEffect(() => {
        console.log('Se montó el componente');

        async function categoriesCUData() {
            const response = await fetch("http://localhost:3011/api/products");
            const data =await response.json()
            const countByCategory = data.countByCategory
            const categoryProperties = Object.keys(countByCategory)
            const total = categoryProperties
            setTotalProductsCU(total)
            console.log(total);
        }
        categoriesCUData();
    }, []);
    
    return(
        <div>
            <h1>Categorías con el total de productos</h1>
            {totalProductsCU.length === 0 ? <p>Cargando...</p> : ''}
           <p> {totalProductsCU}</p>
           
        </div>
    )
    
}
export default TotalCategoryCU;