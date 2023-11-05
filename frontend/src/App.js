import './App.css';
import Home from './components/Home';
import Contador from './components/Contador'
import RickMortyFuncion from './components/RickMortyFuncion';
import FrutasVersionFuncion from './components/FrutasVersionFuncion';
import Error404 from './components/Error404';
import { Link, Route, Routes } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <header>
        <div className='in-line'>
          <Link to="/">Home</Link>
          <Link to="/contador">Contador</Link>
          <Link to="/rickMortyFuncion">RickMortyFuncion</Link>
          <Link to="/frutasVersionFuncion">FrutasVersionFuncion</Link>
        </div>
        <hr />
        <Routes>
          <Route path='/' exact Component={Home} />
          <Route path="/Contador" element={<Contador valorInicial={0} />} />
          <Route path='/RickMortyFuncion' Component={RickMortyFuncion} />
          <Route path='/FrutasVersionFuncion' Component={FrutasVersionFuncion} />
          <Route element={Error404} />
        </Routes>
        
      </header>
    </div>
  )
}

export default App;
