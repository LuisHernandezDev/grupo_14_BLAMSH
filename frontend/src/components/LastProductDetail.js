import React, { useEffect, useState } from 'react';

function LastProductDetail() {
    const [lastProductDetail, setLastProductDetail] = useState([]);

    useEffect(() => {
        console.log('Se montó el componente');

        async function lastProductDetailData() {
            try {
                const response = await fetch("http://localhost:3011/api/products/last")
                const data = await response.json()
                setLastProductDetail(data[0])
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        lastProductDetailData();

    }, []);

    return (
        <div>
            <h2>Último producto creado</h2>
            {lastProductDetail.length === 0 ? <p>Cargando...</p> : ''}
            <div>
                <p>Producto: {lastProductDetail.name}</p>
                <p>Descripción: {lastProductDetail.description}</p>
                <p>Precio: {lastProductDetail.price}</p>
                <img className='img-product-detail' src={lastProductDetail.image} alt="" />
            </div>
        </div>
    )

}

export default LastProductDetail;
