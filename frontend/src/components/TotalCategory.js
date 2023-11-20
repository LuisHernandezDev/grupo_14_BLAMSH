import React, {useEffect, useState} from 'react';
import StatBox from './StatBox';

import { tokens } from "../styles/theme";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import TrafficIcon from "@mui/icons-material/Traffic";

function TotalCategory() {
    const [totalCategories, setTotalCategories] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        console.log('Se montó el componente');

        async function categoriesData() {
            const response = await fetch("http://localhost:3011/api/products");
            const data =await response.json()
            const countByCategory = data.countByCategory
            const categoryProperties = Object.keys(countByCategory)
            const total = categoryProperties.length
            setTotalCategories(total)
            console.log(data);
        }
        categoriesData();
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
          title= {totalCategories.length === 0 ? <p>Cargando...</p> : totalCategories}
          
          subtitle="Total de Categorías"
          progress="0.80"       
          icon={
            <TrafficIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      </Box>

    )
}

export default TotalCategory;