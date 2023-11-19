import React, { useEffect, useState } from 'react';
import { tokens } from "../styles/theme";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import TrafficIcon from "@mui/icons-material/Traffic";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

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
              variant="h5"
              fontWeight="600"
              color={colors.grey[100]}
            >
              Último producto creado
            </Typography>
            <Typography
              variant="h3"
              fontWeight="bold"
              color={colors.greenAccent[500]}
            >
              {lastProductDetail.name}
            </Typography>
          </Box>
          <Box>
            <IconButton>
              <DownloadOutlinedIcon
                sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
              />
            </IconButton>
          </Box>
        </Box>
        <Box height="250px" m="-20px 0 0 0">
        <Typography
              variant="h5"
              fontWeight="600"
              color={colors.grey[100]}
            >
        {lastProductDetail.description}
             
            </Typography>
        </Box>
      </Box>

    )

}

export default LastProductCreate;
