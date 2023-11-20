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
                    Último usuario registrado
                </Typography>
            </Box>
            <Box>

                <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                >
                    {lastUserDetail.firstName}

                </Typography>
            </Box>




        </Box>
        <Box width="100%" m="0 30px">

            <Box display="flex" justifyContent="space-between" mt="2px">
                <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                    {lastUserDetail.lastName}
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
                    {lastUserDetail.email}
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
                    {lastUserDetail.date_creation}
                </Typography>
              
            </Box>


        </Box>
     

        <Box width="100%" m="0 30px">

            <Box display="flex" justifyContent="space-between" mt="2px" maxWidth={345}>
            <CardMedia
                        component="img"
                        alt="Descripción de la imagen"
                        height="140"
                        image={lastUserDetail.image}
                    />
               
           
            </Box>


        </Box>

      
    </Box >



        /*
        <div>
            <h2>Último usuario registrado</h2>
            {lastUserDetail.length === 0 ? <p>Cargando...</p> : ''}
            <div>
                <p>Nombre: {lastUserDetail.firstName}</p>
                <p>Apellido: {lastUserDetail.lastName}</p>
                <p>Email: {lastUserDetail.email}</p>
                <p>Fecha de creación: {lastUserDetail.date_creation}</p>
                <img className='img-product-detail' src={lastUserDetail.image} alt="" />
            </div>
        </div>
        */
    )

}

export default LastUserDetail;
