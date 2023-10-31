import { useState } from "react";

function FrutasVersionFuncion() {
    const [listadoDeFrutas, setListadoDeFrutas] = useState(["Manzana", "Naranja", "Pera"]);

    const agregarFruta = event => {
        event.preventDefault();
        let nuevaFruta = event.target.nuevaFruta.value;
        setListadoDeFrutas([
            ...listadoDeFrutas, nuevaFruta
        ]);
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