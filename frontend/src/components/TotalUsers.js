import React, { useState, useEffect } from 'react';
import StatBox from './StatBox';

import { tokens } from "../styles/theme";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import EmailIcon from "@mui/icons-material/Email";



function TotalUsers() {
    const [totalUsers, setTotalUsers] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        

        async function usersData() {
            try {
                const response = await fetch("http://localhost:3011/api/users");
                const data = await response.json()
                setTotalUsers(data.count)
                
            } catch (error) {
                console.log(error);
            }

        }
        usersData();
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
           title={totalUsers===0 ? <p>cargando</p>:totalUsers}
          subtitle="Total de usuarios"
          progress="0.50"
          increase="+21%"
          icon={
            <PointOfSaleIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      </Box>

    )

}

export default TotalUsers;