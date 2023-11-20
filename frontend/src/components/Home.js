import React from 'react';
import TotalProducts from './TotalProducts';
import TotalUsers from './TotalUsers';
import TotalCategory from './TotalCategory';
import LastProductCreate from './LastProductCreate';
import TotalCategoryCU from './TotalCategoryCU';
import ProductsList from './ProductsList';
import LastUserDetail from './LastUserDetail';
import { tokens } from "../styles/theme";
import { useTheme, Grid } from "@mui/material";




function Home() {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (

        <Grid container spacing={3}>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <TotalProducts />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>


                <TotalUsers />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <TotalCategory />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <LastProductCreate />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <LastUserDetail />
            </Grid>
            <Grid item xs={12}>
                <TotalCategoryCU />
            </Grid>
            <Grid item xs={12} >
                <ProductsList />


            </Grid>

        </Grid>


    )

}

export default Home;

