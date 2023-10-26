import React, { Component } from 'react';

class MiComponente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "Hacé click para suscribirte y recibir noticias"
        }
    }

    styles = {
        color: teal

    }

    cambiarColor() {
        this.styles = {
            color: pink
        }
    }

    render() {
        return (
            <div>
                <h3 onMouseOver={this.cambiarColor} styles={this.styles}>{this.state.message}</h3>
            </div>
        )
    }

}


// componentDidMount() {
//     fetch("https://api.giphy.com/v1/gifs/random?api_key=FSHnaiOlYd2NXPdn06Qdh64qxmGRVM69&tag=&rating=g");
//     .then(results => {results.json()})
//     .then(data => { this.setState({gif: data.data.image_url})})
// }

export default MiComponente