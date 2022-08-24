import React from 'react';
import {Button, HStack, IconButton, Text} from "@chakra-ui/react";
import {FaMinus, FaPlus} from "react-icons/fa";
import {useCart} from "../../context/CartContext";
import {IProduct} from '../../models/IProduct';

interface CounterProps {
    product: IProduct,
    quantity: number
}

const Counter = ({product, quantity, ...rest}: CounterProps) => {
    const {increaseCartQuantity, decreaseCartQuantity} = useCart();
    return (
        <>
            {quantity === 0 ? (
                <Button colorScheme='yellow'
                        boxShadow='md'
                        rounded='2xl'
                        m={3}
                        px={8}
                        py={5}
                        transition='all .3s ease'
                        _hover={{transform: 'scale(1.05)'}}
                        onClick={() => increaseCartQuantity(product)}
                >
                    В корзину
                </Button>
            ) : (
                <HStack mx={2} my={3} rounded='2xl' backgroundColor='white' boxShadow='md'
                        cursor='default' justifyContent='space-around'>
                    <IconButton aria-label='Add item'
                                icon={<FaMinus/>}
                                backgroundColor='white'
                                borderRadius='16px'
                                _focus={{boxShadow: 'none'}}
                                onClick={() => decreaseCartQuantity(product)}
                    />
                    <Text textAlign={"center"} fontSize={"large"} fontWeight='bold' px={2}>
                        {quantity}
                    </Text>
                    <IconButton aria-label='Add item'
                                icon={<FaPlus/>}
                                variant='ghost'
                                borderRadius='16px'
                                _focus={{boxShadow: 'none'}}
                                onClick={() => increaseCartQuantity(product)}
                    />
                </HStack>
            )}
        </>
    );
};

export default Counter;