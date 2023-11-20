import React, { useEffect, useState } from 'react';
import { tokens } from "../styles/theme";
import { Box, Typography, useTheme } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';


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
                        Ultimo producto Creado
                    </Typography>
                </Box>
                <Box>

                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        color={colors.greenAccent[500]}
                    >
                        {lastProductDetail.name}

                    </Typography>
                </Box>




            </Box>
            <Box width="100%" m="0 30px">

                <Box display="flex" justifyContent="space-between" mt="2px">
                    <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                        {lastProductDetail.name}
                    </Typography>
                    <Typography
                        variant="h5"
                        fontStyle="italic"
                        sx={{ color: colors.greenAccent[600] }}
                    >

                    </Typography>
                </Box>


            </Box>
            <Box width="100%" m="0 30px">

                <Box display="flex" justifyContent="space-between" mt="2px">
                    <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                        {lastProductDetail.description}
                    </Typography>
                    <Typography
                        variant="h5"
                        fontStyle="italic"
                        sx={{ color: colors.greenAccent[600] }}
                    >

                    </Typography>
                </Box>


            </Box>

            <Box width="100%" m="0 30px">

                <Box display="flex" justifyContent="space-between" mt="2px">
                    <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                        {lastProductDetail.price}
                    </Typography>


                </Box>


            </Box>

            <Box width="100%" m="0 30px">

                <Box display="flex" justifyContent="space-between" mt="2px" maxWidth={345}>
                    <CardMedia
                        component="img"
                        alt="Descripción de la imagen"
                        height="140"
                        image={lastProductDetail.image}
                    />

                </Box>


            </Box>


        </Box >



    )

}

export default LastProductCreate;
