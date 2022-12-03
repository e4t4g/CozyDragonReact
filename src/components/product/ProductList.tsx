import {Box, Button, Center, Flex, Heading, SimpleGrid, Spinner, Text, useDisclosure} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {ProductItem} from "./ProductItem";
import axios from "axios";
import ProductSkeleton from "../UI/ProductSkeleton";
import {IProduct} from '../../models/IProduct';
import ErrorMessage from "../UI/ErrorMessage";
import {useCategory} from "../../context/CategoryContext";
import {GrAdd} from "react-icons/gr";
import NewProductDrawer, {Values} from './NewProductDrawer';
import {isEmpty} from "../../utilities/isEmpty";
import {ToastError, ToastSuccess} from '../../utilities/error-handling';
import {rootURL} from "../../constants/URLs";

const ProductList = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [error, setError] = useState('');
    // const [offset, setOffset] = useState(0);
    // const [limit] = useState(8);
    const {currentCategory, onChangeCurrentCategory, categories} = useCategory();
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [isLoading, setIsLoading] = useState(true);
    // const [contentLength, setContentLength] = useState(0);

    const isAdmin = true;

    const fetchProducts = async () => {
        setError('');
        await axios.get(
            isEmpty(currentCategory)
                ? `${rootURL}/items`
                : `${rootURL}/items/categories/${currentCategory.name}`
        )
            .then(response => {
                setProducts([...products, ...response.data]);
                // setOffset(prevState => prevState + limit);
                // setContentLength(+response.headers['content-length']);
            })
            .catch(e => setError(e.message))
            .finally(() => {
                setIsLoading(false)
            });
    };

    useEffect(() => {
        if (isLoading) {
            fetchProducts();
        }
    }, [isLoading]);

    // useEffect(() => {
    //     setProducts([]);
    //     setOffset(0);
    //     setIsLoading(true);
    //     window.scroll({
    //         top: 0,
    //         left: 0,
    //     });
    // }, [currentCategory]);
    //
    // useEffect(() => {
    //     document.addEventListener('scroll', scrollHandler)
    //     return function () {
    //         document.removeEventListener('scroll', scrollHandler)
    //     }
    // })
    //
    // const scrollHandler = (e: any) => {
    //     const scrollHeight = e.target.documentElement.scrollHeight;
    //     const scrollTop = e.target.documentElement.scrollTop;
    //     const innerHeight = window.innerHeight;
    //     if (scrollHeight - (scrollTop + innerHeight) < 200 && contentLength > 2) {
    //         setIsLoading(true)
    //     }
    // }

    const onChangeCategory = (id: number) => {
        const selectedCategory = categories.find(c => c.id == id);
        if (selectedCategory) {
            onChangeCurrentCategory(selectedCategory)
        }
    }

    const onAddNewProduct = async (values: Values) => {
        const result = {
            "title": values.title,
            "description": values.description,
            "price": values.price,
            "category": values.categoryId,
            "image": values.image
        };

        await axios.post(`${rootURL}/items`, result)
            .then(() => {
                if (currentCategory.id !== values.categoryId) {
                    onChangeCategory(values.categoryId);
                }
                ToastSuccess('The product was successfully added');
                onClose();
            })
            .catch(error => {
                ToastError(error.message);
            }).finally(() => {
                fetchProducts();
            })
    }

    const SkeletonList = () => (
        <>
            {Array(8)
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
            <>
                <Flex justifyContent='space-between' gap={5}>
                    <Heading mb={5}>{currentCategory?.name?.toUpperCase() ?? 'All'.toUpperCase()}</Heading>
                    {isAdmin &&
                        <Button
                            position='fixed'
                            right='50px'
                            boxShadow='md'
                            zIndex='10'
                            rightIcon={<GrAdd/>}
                            px={6}
                            minW='fit-content'
                            colorScheme='yellow'
                            fontWeight='normal'
                            onClick={onOpen}>
                            Добавить новый товар
                        </Button>
                    }
                </Flex>
                {error && <ErrorMessage message={error}/>}
                <SimpleGrid minChildWidth='210px' width='100%' spacing='6'>
                    {isLoading && products.length === 0
                        ? <SkeletonList/>
                        : (
                            products.map(product => (
                                <ProductItem product={product} key={product.id}/>
                            ))
                        )
                    }
                    {!isLoading && !error && products.length === 0 && (
                        <Center h='50vh'>

                            <Text color='gray'>
                                {isEmpty(currentCategory)
                                    ? 'Список товаров пуст'
                                    : 'В данной категории нет товаров'
                                }

                            </Text>
                        </Center>
                    )}
                </SimpleGrid>
                {products.length > 0 && isLoading && (
                    <Center mt={10}>
                        <Spinner thickness='4px'
                                 speed='0.65s'
                                 emptyColor='gray.200'
                                 color='yellow.500'
                                 size='xl'/>
                    </Center>
                )}
            </>

            <NewProductDrawer isOpen={isOpen} onClose={onClose} onAddNewProduct={onAddNewProduct}/>
        </Box>
    );
};

export default ProductList;
