import './App.css';
import LastProductDetail from './components/LastProductDetail';
import LastUserDetail from './components/LastUserDetail';
import TotalCategory from './components/TotalCategory';
import TotalCategoryCU from './components/TotalCategoryCU';
// import Error404 from './components/Error404';
// import { Link, Route, Routes } from 'react-router-dom'
import TotalProducts from './components/TotalProducts'
import TotalUsers from './components/TotalUsers';


function App() {
  return (
    <>
      <h1>BLAMSH Dashboard</h1>
      <div className='totales'>
        <div className='result'><TotalProducts /></div>
        <div className='result'><TotalUsers /></div>
        <div className='result'><TotalCategory /></div>
      </div>
      <div className='detail-last-product-user'>
        <div className='detail-last'><LastProductDetail/></div>
        <div className='detail-last'><LastUserDetail/></div>
        </div>
        <div><TotalCategoryCU/></div>
    </>
  )
}

export default App;
