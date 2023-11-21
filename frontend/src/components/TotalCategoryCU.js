import React, { useEffect, useState } from 'react';

import StatBox from './StatBox';


import { tokens } from "../styles/theme";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import TrafficIcon from "@mui/icons-material/Traffic";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

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
            height="200px"
            backgroundColor={colors.primary[400]}

            alignItems="center"
            justifyContent="center"
            mt={2}
            pt={3}
            pl={3}
            pb={3}
        >
            <Box pb={2}>

                <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                >
                    Lista de Categorías
                </Typography>
            </Box>
            {Object.keys(totalProductsCU).length === 0 ? <p>Cargando...</p> :
                Object.keys(totalProductsCU).map((categories, i) => {
                    return (
                        <Typography variant="h4"
                            fontWeight="bold"
                            sx={{ color: colors.grey[100] }}>{categories}: {totalProductsCU[categories]}</Typography>
                    )

                })}


        </Box>



    )

}
export default TotalCategoryCU;