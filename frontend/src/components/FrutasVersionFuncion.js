import { useState } from "react";

function FrutasVersionFuncion() {
    const [listadoDeFrutas, setListadoDeFrutas] = useState(["Manzana", "Naranja", "Pera"]);

    const agregarFruta = event => {
        event.preventDefault(); // Usamos preventDefault para que el formulario no refrezque la pantalla y no se envíe el formulario.
        let nuevaFruta = event.target.nuevaFruta.value;

        if (nuevaFruta.length > 0) { // Si el campo es mayor a 0 entonces sí agrega la fruta, es decir, si no esta vacío.
            setListadoDeFrutas([
                ...listadoDeFrutas,
                nuevaFruta
            ]);
        }
        event.target.nuevaFruta.value = "";
    }

    const eliminarFruta = (index) => { // Le pasamos como parámetro el índice de la fruta que queremos eliminar.
        let nuevaListaDeFrutas = [...listadoDeFrutas];
        nuevaListaDeFrutas.splice(index, 1); // Eliminamos un solo elementos del array
        setListadoDeFrutas(nuevaListaDeFrutas);
    }

    return (
        <div>
            <h3>Soy el componente Frutas Función</h3>
            <ul>
                {listadoDeFrutas.map((fruta, i) => {
                    return <li key={i}>{fruta} <button onClick={() => eliminarFruta(i)}>Eliminar Fruta</button></li>
                })}

            </ul>
            <form onSubmit={agregarFruta}>
                <input name="nuevaFruta" type="text" /> <br />
                <button>Añadir nueva fruta</button>
            </form>

        </div>
    )

}

export default FrutasVersionFuncion;