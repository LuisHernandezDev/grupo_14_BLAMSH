import React, { useEffect, useState } from 'react';

function LastProductDetail() {
    const [lastProductDetail, setLastProductDetail] = useState([]);

    useEffect(() => {
        console.log('Se montó el componente');

        async function lastProductDetailData() {
            try {
                const response = await fetch("http://localhost:3011/api/products")
                const data = await response.json()
                const lastProduct = data.products[data.products.length -1]
                console.log(data.products.productDetail);
                setLastProductDetail(lastProduct)
            } catch (error) {
                console.log(error);
            }
        }
        lastProductDetailData();


    }, []);

    return (
        <div>
            <h2>Detalle de último producto creado</h2>
            {/* {lastProductDetail.length === 0 ? <p>Cargando...</p> : ''} */}
            <div>
                <p>Nombre: {lastProductDetail.name}</p>
                <p>Descripción: {lastProductDetail.description}</p>
                <p>Precio: {lastProductDetail.price}</p>
            </div>

        </div>
    )

}

export default LastProductDetail;
