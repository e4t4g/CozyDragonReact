import React, {useState} from 'react';
import {
    Grid,
    GridItem
} from '@chakra-ui/react';
import {Sidebar} from "../components/Sidebar";
import ProductList from '../components/ProductList';
import CartSidebar from "../components/CartSidebar";

export const Home = () => {
    const [currentCategory, setCurrentCategory] = useState('All');

    return (
        <Grid
            templateAreas={`"nav main aside"`}
            gridTemplateRows={'1fr'}
            gridTemplateColumns={'220px 1fr 450px'}
            h='100%'
            color='blackAlpha.800'
        >
            <GridItem area={'nav'}>
                <Sidebar
                    currentCategory={currentCategory}
                    selectCategory={(c) => setCurrentCategory(c)}
                />
            </GridItem>
            <GridItem area={'main'} overflow={"hidden"}>
                <ProductList currentCategory={currentCategory}/>
            </GridItem>
            <GridItem area={'aside'}>
                <CartSidebar/>
            </GridItem>
        </Grid>
    );
}
