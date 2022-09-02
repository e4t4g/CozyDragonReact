import React from 'react';
import {Grid, GridItem} from "@chakra-ui/react";
import {Sidebar} from "../components/Sidebar";
import ProductList from "../components/product/ProductList";

export const Admin = () => {
    return (
        <>
            <Grid
                templateAreas={`"nav main"`}
                gridTemplateRows={'1fr'}
                gridTemplateColumns={'220px 1fr'}
                h='100%'
                color='blackAlpha.800'
            >
                <GridItem area={'nav'}>
                    <Sidebar/>
                </GridItem>
                <GridItem area={'main'} overflow={"hidden"}>
                    <ProductList/>
                </GridItem>
            </Grid>
        </>

    );
};
