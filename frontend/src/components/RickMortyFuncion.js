import { useState, useEffect } from 'react';


function RickMortyFuncion() {
    const [personajes, setPersonajes] = useState([])
    const [pagina, setPagina] = useState(1);

    useEffect(() => {
        console.log("Se montó el componente");

        async function fetchData() {

            try {
                const response = await fetch('https://rickandmortyapi.com/api/character');
                const data = await response.json()
                setPersonajes(data.results)
                console.log(data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        console.log("Se actualizó el componente");
    }, [personajes]);

    useEffect(() => {
        return () => console.log('Se desmontó el componente');

    }, []);

    const CargarMas = async () => {  
        await setPagina(pagina + 1)
    };
             useEffect(() => {
                 async function fetchData() {            
    
                try {
                    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${pagina}`);
                    const data = await response.json()
                    setPersonajes(data.results)
                    console.log(data);
    
                } catch (error) {
                    console.log(error);
                }
            }
            fetchData();
        
        }, [pagina]);

    return (
        <div>
            <h1>Soy el componente Rick and Morty Función</h1>

            <ul>{personajes.length == 0 && <p>Cargando...</p>}
                {personajes.map((personaje, i) => {
                    return (
                        <li key={i}>
                            <h3>{personaje.name}</h3>
                            <img src={personaje.image} alt="" width="150" />
                        </li>
                    )
                })}

<button onClick={() => CargarMas()}>Siguiente</button>
            </ul>

        </div>
    )
}

export default RickMortyFuncion;