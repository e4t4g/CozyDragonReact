import React, {useEffect, useState} from 'react';
import {
    Button,
    Divider,
    Flex,
    Skeleton,
    SkeletonText,
    VStack
} from "@chakra-ui/react";
import {useParams} from 'react-router-dom';
import axios from "axios";
import {IProduct} from "../models/IProduct";
import MainBlockLayout from "../components/UI/MainBlockLayout";
import EditTitle from "../components/edit-product/EditTitle";
import {EditDescription} from "../components/edit-product/EditDescription";
import {EditPrice} from '../components/edit-product/EditPrice';
import {EditImage} from "../components/edit-product/EditImage";

export const EditProduct = () => {
    const {productId} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState({} as IProduct);

    const isAdmin = false;

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        setIsLoading(true);
        await axios.get(`https://fakestoreapi.com/products/${productId}`)
            .then(({data}) => {
                setProduct(data);
            }).catch(error => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const updateTitle = (v: string) => setProduct({...product, title: v})
    const updateDescription = (v: string) => setProduct({...product, description: v})
    const updatePrice = (v: string) => setProduct({...product, price: v})
    const updateImage = (v: string) => setProduct({...product, image: v})

    const onSaveChanges = async () => {
        await axios.put(`https://fakestoreapi.com/products/${productId}`, product).then((res) => console.log(res));
    }

    return (
        <MainBlockLayout>
            {isLoading && <Flex gap={10} pt={20}>
                <Skeleton height='400px' rounded='2xl' maxW='400px' flex={2} startColor='gray.300' endColor='gray.300'/>
                <Flex flexDirection='column' justifyContent='center' flex={1} height='400px' gap={5}>
                    <SkeletonText noOfLines={3} spacing='4' pb={5}/>
                    <SkeletonText noOfLines={4} spacing='4'/>
                    <Skeleton height='48px' w='144px' mt={8} borderRadius='2xl'/>
                </Flex>
            </Flex>}
            {!isLoading && product &&
                <Flex gap={5} pt={20}>
                    <EditImage image={product.image} updateImage={updateImage}/>
                    <VStack spacing={7} flex={1} alignItems='start' justifyContent='center'>
                        <EditTitle
                            title={product.title}
                            updateTitle={updateTitle}
                        />
                        <EditDescription
                            description={product.description}
                            updateDescription={updateDescription}
                        />
                        <EditPrice
                            price={product.price}
                            updatePrice={updatePrice}/>
                        <Divider/>
                        <Button colorScheme='yellow'
                                boxShadow='md'
                                rounded='2xl'
                                px={6}
                                py={6}
                                onClick={() => onSaveChanges()}
                        >
                            Сохранить изменения
                        </Button>
                    </VStack>
                </Flex>
            }
        </MainBlockLayout>
    );
};