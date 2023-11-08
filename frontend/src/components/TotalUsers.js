import React, { useState, useEffect } from 'react';
import '../styles/Styles.css'


function TotalUsers() {
    const [totalUsers, setTotalUsers] = useState([]);

    useEffect(() => {
        console.log('Se montó el componente');

        async function usersData() {
            try {
                const response = await fetch("http://localhost:3011/api/users");
                const data = await response.json()
                setTotalUsers(data.count)
                console.log(data.count);
            } catch (error) {
                console.log(error);
            }

        }
        usersData();
    }, []);

    return (
        <div>
            <h1>Total de usuarios</h1>
            {totalUsers.length === 0 ? <p>Cargando...</p> : null}
            <p>{totalUsers}</p>
        </div>

    )

}

export default TotalUsers;