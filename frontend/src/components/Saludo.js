import React from 'react';
import Saludo from './Saludo'


function Saludando() {
    return (
        <div>

            <Saludo titulo="Hola mundo" />
            <Saludo subtitulo="¡Nunca paremos de aprender!" />
            {props.listado.map((elemento, i) => <li key={elemento + i}> {elemento} </li>)}


        </div>
    )
}

export default Saludando;