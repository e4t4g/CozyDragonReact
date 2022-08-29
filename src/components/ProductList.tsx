import {
    Box,
    Heading,
    SimpleGrid
} from '@chakra-ui/react';
import React, {FC, useEffect, useState} from 'react';
import {ProductItem} from "./ProductItem";
import axios from "axios";
import ProductSkeleton from "./UI/ProductSkeleton";
import {IProduct} from '../models/IProduct';
import ErrorMessage from "./UI/ErrorMessage";

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

    const SkeletonList = () => (
        <>
            {Array(4).fill(null).map((_, index) => <ProductSkeleton key={index}/>)}
        </>
    )

    return (
        <Box
            textAlign='left'
            py='40px'
            px='50px'
            width='100%'
            height='100%'
            bg='gray.50'
            overflowY='auto'
        >
            <Heading mb={5}>{currentCategory.toUpperCase()}</Heading>

            {error && <ErrorMessage message={error}/>}

            {!error && <SimpleGrid minChildWidth='210px' width='100%' spacing='6'>
                {isLoading && <SkeletonList/>}
                {!isLoading && products.map(product => (
                    <ProductItem product={product} key={product.id}/>
                ))}
            </SimpleGrid>}
        </Box>
    );
};

export default ProductList;
