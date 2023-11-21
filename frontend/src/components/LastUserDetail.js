import React, { useEffect, useState } from 'react';
import { tokens } from "../styles/theme";
import { Box, Typography, useTheme } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';


function LastUserDetail() {
    const [lastUserDetail, setLastUserDetail] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        console.log('Se montó el componente');

        async function lastProductDetailData() {
            try {
                const response = await fetch("http://localhost:3011/api/users/last")
                const data = await response.json()
                setLastUserDetail(data[0])
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        lastProductDetailData();

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
                    Ultimo  usuario registrado
                </Typography>
            </Box>
            <Typography variant="h5">Nombre: {lastUserDetail.firstName}</Typography>
            <Typography variant="h5">Mail: {lastUserDetail.email}</Typography>
            <Typography variant="h5">Fecha de Creación: {lastUserDetail.date_creation}</Typography>

            <Box display="flex" justifyContent="center" mt="37px" maxWidth={345}>
                <CardMedia
                    component="img"
                    alt="Descripción de la imagen"
                    height="140"
                    image={lastUserDetail.image}
                />

            </Box>
        </Box>

    )

}

export default LastUserDetail;
