import React, { useEffect, useState } from 'react';
import StatBox from './StatBox';

import { tokens } from "../styles/theme";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';



function TotalProducts() {
    const [totalProducts, setTotalProducts] = useState([])

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    useEffect(() => {
        console.log('Se montó el componente');

        async function productsData() {
            try {
                const response = await fetch("http://localhost:3011/api/products")
                const data = await response.json()
                setTotalProducts(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        productsData();
    }, []);

    
    return(
        <Box
        gridColumn="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        mt={2}
        pt={3 }
        pb={3}
      >
        <StatBox
          title= {totalProducts.length===0 ? <p>Cargando</p>: totalProducts.count}
          
          subtitle="Total de productos"
        
          icon={
            <TwoWheelerIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      </Box>
    )
    
}
        //  <ul>
        //  {products.length === 0 ? <p>Cargando...</p> : ''}
        //      {Array.from(products).map((product, i) => {
        //          return(
        //              <li key={i}>
        //                  <p>{product.name}</p>
        //                  <p>{product.description}</p>
        //                  <p>{product.price}</p>
        //              </li>
        //          )
        //      })}
        //  </ul>
 
export default TotalProducts;