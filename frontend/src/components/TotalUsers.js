import React, { useState, useEffect } from 'react';
import StatBox from './StatBox';

import { tokens } from "../styles/theme";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import GroupIcon from '@mui/icons-material/Group';



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
        mt={2}
        pt={3}
        pb={3}
      >
        <StatBox
           title={totalUsers===0 ? <p>cargando</p>:totalUsers}
          subtitle="Total de usuarios"
          icon={
            <GroupIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      </Box>

    )

}

export default TotalUsers;