import React, {useEffect, useState} from 'react';
import {Box, Flex, Image, Skeleton, SkeletonText, Text, VStack} from "@chakra-ui/react";
import {useParams} from 'react-router-dom';
import axios from "axios";
import {IProduct} from "../models/IProduct";
import {formatCurrency} from "../utilities/formatCurrency";
import Counter from "../components/UI/Counter";
import {useCart} from "../context/CartContext";
import {FavouriteSwitcher} from "../components/UI/FavouriteSwitcher";
import MainBlockLayout from "../components/UI/MainBlockLayout";
import {isEmpty} from "../utilities/isEmpty";

export const Product = () => {
    const {productId} = useParams();
    const {getItemQuantity} = useCart();
    const [product, setProduct] = useState<IProduct>({} as IProduct);
    const [isLoading, setIsLoading] = useState(false);

    const quantity = getItemQuantity(Number(productId));

    const getProduct = async () => {
        setIsLoading(true);
        console.log('productId', productId);
        await axios
            .get(`https://api.escuelajs.co/api/v1/products/${productId}`)
            .then(response => {
                console.log('response.data', response.data)
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
        <MainBlockLayout>
            {isLoading && <Flex gap={10} pt={15}>
                <Skeleton height='500px' rounded='2xl' maxW='500px' flex={2} startColor='gray.300'
                          endColor='gray.300'/>
                <Flex flexDirection='column' justifyContent='center' flex={1} height='500px' gap={5}>
                    <SkeletonText noOfLines={3} spacing='4' pb={5}/>
                    <SkeletonText noOfLines={4} spacing='4'/>
                    <Skeleton height='48px' w='144px' mt={8} borderRadius='2xl'/>
                </Flex>
            </Flex>}

            {!isLoading && !isEmpty(product) &&
                <Flex gap={10} pt={10}>
                    <Flex maxH='500px'
                          maxW='500px'
                          minW='200px'
                          justifyContent='center'
                          flex={2}
                          position='relative'
                    >
                        <FavouriteSwitcher isFav={true}/>
                        <Image
                            maxH='100%'
                            maxW='100%'
                            minH='500px'
                            minW='500px'
                            objectFit={'contain'}
                            src={product.images[0]}
                            fallbackSrc={'/imgs/placeholder-image.jpg'}
                        />
                    </Flex>
                    <VStack spacing={8} flex={1} alignItems='start' justifyContent='center'>
                        <Text fontSize='xx-large' noOfLines={3}>{product.title}</Text>
                        <Text>{product.description}</Text>
                        <Flex
                            border='1px solid' borderColor='gray.200' borderRadius='2xl' p={4}
                            justifyContent='space-between' alignItems='center' minW='350px' w='100%' gap={3} my={5}
                            maxW='450px'>
                            <Text flex={1} color='red.600'
                                  fontSize='x-large'>{formatCurrency(Number(product.price))}</Text>
                            <Box flex={1} textAlign='right'>
                                <Counter product={product} quantity={quantity} buttonColor='yellow.400'/>
                            </Box>
                        </Flex>
                    </VStack>
                </Flex>
            }
        </MainBlockLayout>
    );
};