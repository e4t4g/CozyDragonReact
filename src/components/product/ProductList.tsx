import {
    Box,
    Button,
    Flex,
    Heading,
    SimpleGrid,
    useDisclosure
} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {ProductItem} from "./ProductItem";
import axios from "axios";
import ProductSkeleton from "../UI/ProductSkeleton";
import {IProduct} from '../../models/IProduct';
import ErrorMessage from "../UI/ErrorMessage";
import {useCategory} from "../../context/CategoryContext";
import {GrAdd} from "react-icons/gr";
import NewProductDrawer from './NewProductDrawer';

const ProductList = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const {currentCategory} = useCategory();
    const {isOpen, onOpen, onClose} = useDisclosure()

    const isAdmin = false;

    const fetchProducts = async () => {
        setIsLoading(true);
        setError('');
        await axios.get(
            currentCategory === 'all'
                ? 'https://fakestoreapi.com/products'
                : `https://fakestoreapi.com/products/category/${currentCategory}`
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
        fetchProducts();
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
            <Flex justifyContent='space-between' gap={5}>
                <Heading mb={5}>{currentCategory?.toUpperCase()}</Heading>
                {isAdmin && !error &&
                    <Button rightIcon={<GrAdd/>} px={6} minW='fit-content' colorScheme='yellow' fontWeight='normal'
                            onClick={onOpen}>
                        Добавить новый товар
                    </Button>
                }
            </Flex>

            {error && <ErrorMessage message={error}/>}

            {!error && <SimpleGrid minChildWidth='210px' width='100%' spacing='6'>
                {isLoading ? <SkeletonList/> : (
                    products.map(product => (
                        <ProductItem product={product} key={product.id}/>
                    ))
                )}
            </SimpleGrid>}
            <NewProductDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
        </Box>
    );
};

export default ProductList;
