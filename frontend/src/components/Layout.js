import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
//import Loading from '../components/Load';

import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
//import { collection, addDoc, getDocs } from 'firebase/firestore';

const navArrayLinks = [
    {
      title: "Home",
      path: "/",
      icon: <InboxIcon />,
    }
    
  ];

const Layout = () => {
    const [loading, setLoading] = useState(false);
    /*const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])*/

/*
    useEffect(() => {
        getDocs(collection(db, "categorias"))
        .then(docs => {
            let preCategories = []
            docs.forEach(doc => {
                preCategories.push({id: doc.id, ...doc.data()})
            })
            setCategories(preCategories)
        })
        .catch(err => {
            console.log(err)
        })
    }, []);  
    useEffect(() => {
        getDocs(collection(db, "items"))
        .then(docs => {
            let prods = []
            docs.forEach(doc => {
                prods.push({id: doc.id, ...doc.data()})
            })
            setProducts(prods)
        })
        .catch(err => {
            console.log(err)
        })
    }, []);  
*/
    return(/*
        <div className="App">
           
            <NavBar categories={categories} products={products} />
            <Outlet context={[setLoading]} />
            {loading ? <Loading /> : null}  
           
        </div>*/

        <div >
           
            <NavBar navArrayLinks={navArrayLinks} />
            
        
        </div>
    )
}

export default Layout;