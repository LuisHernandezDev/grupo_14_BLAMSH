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

            gridRow="span 2"
            backgroundColor={colors.primary[400]}
        >
            <Box
                mt="25px"
                p="0 30px"
                display="flex "
                justifyContent="space-between"
                alignItems="center"
            >
                <Box>
                   
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        color={colors.greenAccent[500]}
                    >
                        Lista de categorías
                    </Typography>
                </Box>

            </Box>
            <Box height="250px" m="-20px 0 0 0">
                <StatBox
                    title={Object.keys(totalProductsCU).length === 0 ? <p>Cargando...</p> :
                        Object.keys(totalProductsCU).map((categories, i) => {
                            return (
                                <p key={i}>{categories}: {totalProductsCU[categories]}</p>
                            )

                        })}


                    subtitle="Total de Categorías"
                    progress="0.80"
                    increase="+43%"

                />

            </Box>

            <Box height="250px" m="-20px 0 0 0">

            </Box>
        </Box>




    )

}
export default TotalCategoryCU;