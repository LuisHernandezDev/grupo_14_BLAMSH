import React, { useEffect, useState } from 'react';
import '../styles/Styles.css'

function TotalCategoryCU() {
    const [totalProductsCU, setTotalProductsCU] = useState([])

    useEffect(() => {
        console.log('Se montó el componente');
        
        async function categoriesCUData() {
                try {
                const response = await fetch("http://localhost:3011/api/products");
                const data = await response.json()
                const countByCategory = data.countByCategory
                setTotalProductsCU(countByCategory)
                console.log(countByCategory);

            } catch (error) {
                console.log(error);
            }
        }
        categoriesCUData();
    }, []);

    return (
        <div className='categories-CU'>
            <h1>Total de productos por categorias</h1>
            {Object.keys(totalProductsCU).length === 0 ? <p>Cargando...</p> : ''}
            {Object.keys(totalProductsCU).map((categories, i) => {
                return (
                    <p key={i}>{categories}: {totalProductsCU[categories]}</p>
                )

            })}

        </div>
    )

}
export default TotalCategoryCU;