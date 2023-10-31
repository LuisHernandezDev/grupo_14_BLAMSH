import './App.css';
// import Home from './components/Home';
import Contador from './components/Contador'
import FrutasVersionFuncion from './components/FrutasVersionFuncion';
import RickMortyFuncion from './components/RickMortyFuncion';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        
          {/* <Home /> */}
          <Contador valorInicial={0} />
          <FrutasVersionFuncion/>
          <RickMortyFuncion />

          
       
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
