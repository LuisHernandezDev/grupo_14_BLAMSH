import LastProductCreate from './components/LastProductCreate';
import LastUserDetail from './components/LastUserDetail';
import TotalCategory from './components/TotalCategory';
import TotalCategoryCU from './components/TotalCategoryCU';
import ProductsList from './components/ProductsList';
// import Error404 from './components/Error404';
// import { Link, Route, Routes } from 'react-router-dom'
import TotalProducts from './components/TotalProducts'
import TotalUsers from './components/TotalUsers';


function App() {
  return (
    <>
      <h1 className='title'>BLAMSH Dashboard</h1>
      <div className='totales'>
        <div className='result'><TotalProducts /></div>
        <div className='result'><TotalUsers /></div>
        <div className='result'><TotalCategory /></div>
      </div>
      <div className='detail-last-product-user'>
        <div className='detail-last'><LastProductCreate/></div>
        <div className='detail-last'><LastUserDetail/></div>
        </div>
        <div><TotalCategoryCU/></div>        
        <div className='result'><ProductsList/></div>
        
    </>
  )
}

export default App;
