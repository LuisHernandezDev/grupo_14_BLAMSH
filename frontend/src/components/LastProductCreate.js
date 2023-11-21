import React, { useEffect, useState } from 'react';
import { tokens } from "../styles/theme";
import { Box, Typography, useTheme, ImageList, ImageListItem } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';


import StatBox from './StatBox';



function LastProductCreate() {
    const [lastProductDetail, setLastProductDetail] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    useEffect(() => {
        console.log('Se montó el componente');

        async function lastProductCreateData() {
            try {
                const response = await fetch("http://localhost:3011/api/products/last")
                const data = await response.json()
                setLastProductDetail(data[0])
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        lastProductCreateData();

    }, []);

    return (
        <Box

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
                    Ultimo producto Creado
                </Typography>
            </Box>
            <Typography variant="h5">Producto: {lastProductDetail.name}</Typography>
            <Typography variant="h5"
            >Descripción: {lastProductDetail.description}</Typography>
            <Typography variant="h5">Precio: {'$' + lastProductDetail.price}</Typography>
            <Typography variant="h5">Tallas: {lastProductDetail.sizes && lastProductDetail.sizes.length > 0
                ? lastProductDetail.sizes.map((size) => size.size).join(', ') : 'Talla no especificada'}
            </Typography>
            <Box display="flex" justifyContent="center" mt={2} maxWidth={345}>
                <CardMedia
                    component="img"
                    alt="Descripción de la imagen"
                    height="140"
                    image={lastProductDetail.image}
                />

            </Box>
        </Box>


    )

}

export default LastProductCreate;
