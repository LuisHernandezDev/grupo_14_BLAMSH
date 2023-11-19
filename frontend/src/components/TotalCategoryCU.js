import React, { useEffect, useState } from 'react';

import StatBox from './StatBox';

import { tokens } from "../styles/theme";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import TrafficIcon from "@mui/icons-material/Traffic";

function TotalCategoryCU() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [totalProductsCU, setTotalProductsCU] = useState([])


    useEffect(() => {
        console.log('Se montó el componente');
        
        async function categoriesCUData() {
                try {
                const response = await fetch("http://localhost:3011/api/products");
                const data = await response.json()
                const countByCategory = data.countByCategory                
                setTotalProductsCU(countByCategory);
        
                console.log(Object.keys(countByCategory).length);

            } catch (error) {
                console.log(error);
            }
        }
        categoriesCUData();
    }, []);

    return (
        <Box
        gridColumn="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StatBox
          title= {Object.keys(totalProductsCU).length === 0 ? <p>Cargando...</p> : 
          Object.keys(totalProductsCU).map((categories, i) => {
            return (
                <p key={i}>{categories}: {totalProductsCU[categories]}</p>
            )

        })}

          
          subtitle="Total de Categorías"
          progress="0.80"
          increase="+43%"
          icon={
            <TrafficIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      </Box>

        
       
        
    )

}
export default TotalCategoryCU;