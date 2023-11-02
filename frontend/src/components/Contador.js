import React, {Component} from 'react';


class Contador extends Component {
    constructor(props){
        super(props)

        this.state = {
            value: this.props.valorInicial
        }
    }

    aumentar() {
        this.setState({
            value: this.state.value + 1
        });
    }

    decrementar(){
        this.setState({
            value: this.state.value -1
        });
    }

    render() {
        return (
            <>
            <button onClick={() => this.aumentar()}>+</button>
            <h1>{this.state.value}</h1>
            <button onClick={() => this.decrementar()}>-</button>
            </>
        )
    }



}

export default Contador;