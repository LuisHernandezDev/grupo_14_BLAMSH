import React, { useState, useEffect } from 'react';

function TotalUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log('Se montó el componente');

        async function usersData() {
            try {
                const response = await fetch("http://localhost:3011/api/users");
                const data = await response.json()
                setUsers(data.totalQuantity)
                console.log(data.totalQuantity);
            } catch (error) {
                console.log(error);
            }

        }
        usersData();
    }, []);

    return (
        <div>
            <h1>Total de usuarios</h1>
            {users.length === 0 ? <p>Cargando...</p> : null}
            {users}
        </div>

    )

}

export default TotalUsers;