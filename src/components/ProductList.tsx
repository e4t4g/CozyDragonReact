import {
    Box,
    Heading,
    SimpleGrid
} from '@chakra-ui/react';
import React, {FC, useEffect, useState} from 'react';
import {ProductItem, IProduct} from "./ProductItem";
import axios from "axios";
import ProductSkeleton from "./UI/ProductSkeleton";

interface ProductListProps {
    currentCategory: string
}

const ProductList: FC<ProductListProps> = ({currentCategory}) => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchProducts = async (category: string = 'All') => {
        setIsLoading(true);
        setError('');
        await axios.get(
            category === 'All'
                ? 'https://fakestoreapi.com/products'
                : `https://fakestoreapi.com/products/category/${category}`
        )
            .then(response => {
                setProducts(response.data);
            })
            .catch(e => {
                console.log(e.message);
                setError(e.message);
            })
            .then(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchProducts(currentCategory);
    }, [currentCategory]);

    return (
        <Box
            textAlign={"left"}
            py='40px'
            px='50px'
            width='100%'
            height='100%'
            bg='gray.50'
            overflowY={"auto"}
        >
            <Heading mb={5}>{currentCategory.toUpperCase()}</Heading>
            <SimpleGrid minChildWidth='210px' width='100%' spacing='6'>

                {isLoading && Array(3).fill(<ProductSkeleton/>).map(i => i)}
                {!isLoading && products.map(product => (
                    <ProductItem product={product} key={product.id}/>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default ProductList;