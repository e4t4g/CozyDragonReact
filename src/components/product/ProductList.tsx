import {Box, Button, Flex, Heading, SimpleGrid, useDisclosure} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {ProductItem} from "./ProductItem";
import axios from "axios";
import ProductSkeleton from "../UI/ProductSkeleton";
import {IProduct} from '../../models/IProduct';
import ErrorMessage from "../UI/ErrorMessage";
import {useCategory} from "../../context/CategoryContext";
import {GrAdd} from "react-icons/gr";
import NewProductDrawer from './NewProductDrawer';
import {isEmpty} from "../../utilities/isEmpty";

const ProductList = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(20);
    const {currentCategory} = useCategory();
    const {isOpen, onOpen, onClose} = useDisclosure()

    const isAdmin = false;

    const fetchProducts = async () => {
        setIsLoading(true);
        setError('');
        await axios.get(
            isEmpty(currentCategory)
                ? `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
                : `https://api.escuelajs.co/api/v1/categories/${currentCategory.id}/products?offset=${offset}&limit=${limit}`
        )
            .then(response => setProducts(response.data))
            .catch(e => setError(e.message))
            .then(() => setIsLoading(false));
    };

    useEffect(() => {
        fetchProducts();
    }, [currentCategory]);

    const SkeletonList = () => (
        <>
            {Array(4)
                .fill(null)
                .map((_, index) => <ProductSkeleton key={index}/>)}
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
            {error
                ? <ErrorMessage message={error}/>
                : <>
                    <Flex justifyContent='space-between' gap={5}>
                        <Heading mb={5}>{currentCategory?.name?.toUpperCase() ?? 'All'.toUpperCase()}</Heading>
                        {isAdmin &&
                            <Button rightIcon={<GrAdd/>} px={6} minW='fit-content' colorScheme='yellow'
                                    fontWeight='normal'
                                    onClick={onOpen}>
                                Добавить новый товар
                            </Button>
                        }
                    </Flex>
                    <SimpleGrid minChildWidth='210px' width='100%' spacing='6'>
                        {isLoading
                            ? <SkeletonList/>
                            : (
                                products.map(product => (
                                    <ProductItem product={product} key={product.id}/>
                                ))
                            )}
                    </SimpleGrid>
                </>
            }
            <NewProductDrawer isOpen={isOpen} onClose={onClose}/>
        </Box>
    );
};

export default ProductList;
