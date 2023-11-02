import { useState, useEffect, useRef } from 'react';
import './r-y-m.css'

function RickMortyFuncion() {
    const [personajes, setPersonajes] = useState([])
    const [pagina, setPagina] = useState(1);

    const titulo = useRef();
    console.log(titulo);

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
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character?page=${pagina + 1}`);
            const data = await response.json()
            setPersonajes(data.results)

        } catch (error) {
            console.log(error);
        }
    };

    const cambiarColor = () => titulo.current.style.color = 'red';
    const quitarColor = () => titulo.current.style.color = '';


    return (
        <div>
            <h1 onMouseOver={cambiarColor} onMouseOut={quitarColor} ref={titulo}>Soy el componente Rick and Morty Función</h1>
            {/* Acá tambien se puede usar && y funciona como un condicional */}
            <ul>{personajes.length === 0 ? <p>Cargando...</p> : null}
                {personajes.map((personaje, i) => {
                    return (
                        <li className='r-y-m' key={i}>
                            <h3>{personaje.name}</h3>
                            <h4>Género: {personaje.gender}</h4>
                            <h4>Especie: {personaje.species}</h4>
                            <img src={personaje.image} alt="" width="150" />
                        </li>
                    )
                })}

            </ul>
            <button onClick={() => CargarMas()}>Siguiente</button>

        </div>
    )
}

export default RickMortyFuncion;