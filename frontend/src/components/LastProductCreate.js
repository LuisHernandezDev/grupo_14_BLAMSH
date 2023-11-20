import React, { useEffect, useState } from 'react';
import '../styles/Styles.css'

function LastProductCreate() {
    const [lastProductDetail, setLastProductDetail] = useState([]);

    useEffect(() => {
        console.log('Se montó el componente');

        async function lastProductCreateData() {
            try {
                const response = await fetch("http://localhost:3011/api/products/last")
                const data = await response.json()
                setLastProductDetail(data[0])
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        lastProductCreateData();

    }, []);

    return (
        <div>
            <h2>Último producto creado</h2>
            {lastProductDetail.length === 0 ? <p>Cargando...</p> : ''}
            <div>
                <p>Producto: {lastProductDetail.name}</p>
                <p>Descripción: {lastProductDetail.description}</p>
                <p>Precio: {'$' + lastProductDetail.price}</p>
                <p>Tallas: {lastProductDetail.sizes && lastProductDetail.sizes.length > 0 ?
                lastProductDetail.sizes.map((size) => size.size).join(', ') : 'Talla no especificada'}
                </p>
                <img className='img-product-detail' src={lastProductDetail.image} alt="" />
            </div>
        </div>
    )

}

export default LastProductCreate;
