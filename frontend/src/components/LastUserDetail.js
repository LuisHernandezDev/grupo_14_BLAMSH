import React, { useEffect, useState } from 'react';

function LastUserDetail() {
    const [lastUserDetail, setLastUserDetail] = useState([]);

    useEffect(() => {
        console.log('Se montó el componente');

        async function lastProductDetailData() {
            try {
                const response = await fetch("http://localhost:3011/api/users/last")
                const data = await response.json()
                setLastUserDetail(data[0])
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        lastProductDetailData();

    }, []);

    return (
        <div>
            <h2>Último usuario registrado</h2>
            {lastUserDetail.length === 0 ? <p>Cargando...</p> : ''}
            <div>
                <p>Nombre: {lastUserDetail.firstName}</p>
                <p>Apellido: {lastUserDetail.lastName}</p>
                <p>Email: {lastUserDetail.email}</p>
                <p>Fecha de creación: {lastUserDetail.date_creation}</p>
                <img className='img-product-detail' src={lastUserDetail.image} alt="" />
            </div>
        </div>
    )

}

export default LastUserDetail;
