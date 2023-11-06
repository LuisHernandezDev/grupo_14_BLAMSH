import React, {useEffect, useState} from 'react';

function TotalCategory() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        console.log('Se montó el componente');

        async function categoriesData() {
            const response = await fetch("http://localhost:3011/api/products");
            const data =await response.json()
            const countByCategory = data.countByCategory.countByCategory
            const categoryProperties = Object.keys(countByCategory)
            const total = categoryProperties.length
            setCategories(total)
            console.log(data);            
        }
        categoriesData();
    }, []);

    return (
        <div>
            <h1>Total de categorías</h1>
            {categories.length === 0 ? <p>Cargando...</p> : null}
            {categories}
        </div>
    )
}

export default TotalCategory;