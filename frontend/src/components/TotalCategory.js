import React, {useEffect, useState} from 'react';
import '../styles/Styles.css'

function TotalCategory() {
    const [totalCategories, setTotalCategories] = useState([]);

    useEffect(() => {
        console.log('Se montó el componente');

        async function categoriesData() {
            try {
                const response = await fetch("http://localhost:3011/api/products");
                const data =await response.json()
                const countByCategory = data.countByCategory
                const categoryProperties = Object.keys(countByCategory)
                const total = categoryProperties.length
                setTotalCategories(total)
                console.log(data);
                
            } catch (error) {
                console.log(error);
            }
        }
        categoriesData();
    }, []);

    return (
        <div>
            <h1>Total de categorías</h1>
            {totalCategories.length === 0 ? <p>Cargando...</p> : null}
            <p>{totalCategories}</p>
        </div>
    )
}

export default TotalCategory;