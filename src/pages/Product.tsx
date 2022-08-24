import React, {useEffect, useState} from 'react';
import {BackHomeLink} from "../components/UI/BackHomeLink";
import {
    Box,
    Divider,
    Flex,
    Image,
    Skeleton,
    SkeletonText,
    Text,
    VStack
} from "@chakra-ui/react";
import {useParams} from 'react-router-dom';
import axios from "axios";
import {IProduct} from "../models/IProduct";
import {formatCurrency} from "../utilities/formatCurrency";
import Counter from "../components/UI/Counter";
import {useCart} from "../context/CartContext";


export const Product = () => {
    const {productId} = useParams();
    const {getItemQuantity} = useCart();
    const [product, setProduct] = useState<IProduct>({} as IProduct);
    const [isLoading, setIsLoading] = useState(false);

    const quantity = getItemQuantity(Number(productId));

    const getProduct = async () => {
        setIsLoading(true)
        await axios.get(`https://fakestoreapi.com/products/${productId}`)
            .then(response => {
                setProduct(response.data);
            }).catch(error => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getProduct();
    }, []);


    return (
        <Flex flexDirection='column' flex={1} mx='auto' w='70%' maxW='960px' p={5}>
            <BackHomeLink/>
            {isLoading && <Flex gap={10} pt={15}>


                <Skeleton height='500px' rounded='16px' maxW='500px' flex={2} startColor='gray.300'
                          endColor='gray.300'/>

                <Flex flexDirection='column' justifyContent='center' flex={1} height='500px' gap={5}>
                    <SkeletonText noOfLines={3} spacing='4' pb={5}/>
                    <SkeletonText noOfLines={4} spacing='4'/>
                    <Skeleton height='48px' w='144px' mt={8} borderRadius='16px'/>
                </Flex>


            </Flex>}

            {!isLoading && product &&
                <Flex gap={5} pt={10}>

                    <Flex maxH='500px'
                          maxW='500px'
                          justifyContent='center'
                          flex={2}
                    >
                        <Image
                            maxH='100%'
                            maxW='100%'
                            objectFit={'contain'}
                            src={product.image}
                        />
                    </Flex>

                    <VStack spacing={3} flex={1} alignItems='start' justifyContent='center'>
                        <Box ml='20px'>
                            <Text fontSize='xx-large' noOfLines={3} mb={5}>{product.title}</Text>
                            <Divider my={3}/>
                            <Text>{product.description}</Text>
                        </Box>

                        <Flex
                            border='1px solid' borderColor='gray.200' borderRadius='32px' ml='-20px' px={5} py={1}
                            justifyContent='space-between' alignItems='center' w='100%' gap={2} my={5}>
                            <Text flex={1} color='red.600'
                                  fontSize='x-large'>{formatCurrency(Number(product.price))}</Text>
                            <Box flex={1}>
                                <Counter product={product} quantity={quantity}/>
                            </Box>
                        </Flex>
                    </VStack>
                </Flex>
            }


        </Flex>
    );
};