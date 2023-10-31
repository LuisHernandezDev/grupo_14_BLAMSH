import './App.css';
import Home from './components/Home';
import Contador from './components/Contador'
import RickMortyFuncion from './components/RickMortyFuncion';
import FrutasVersionFuncion from './components/FrutasVersionFuncion';
import Error404 from './components/Error404';
import { Switch, Link, Route, Routes } from 'react-router-dom'
console.log(React.Switch);

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <header>
          <Link to="/">Home</Link> <br />
          <Link to="/contador">Contador</Link> <br />
          <Link to="/rickMortyFuncion">RickMortyFuncion</Link> <br />
          <Link to="/frutasVersionFuncion">FrutasVersionFuncion</Link> <br />
          <hr />
        <Routes>
          <Switch>
          <Route path='/' exact Component={Home} />
          <Route path="/Contador" element={<Contador valorInicial={0} />} />
          <Route path='/RickMortyFuncion' Component={RickMortyFuncion} />
          <Route path='/FrutasVersionFuncion' Component={FrutasVersionFuncion} />
          <Route element={Error404}/>
          </Switch>
        </Routes>
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
  )
}

export default App;
