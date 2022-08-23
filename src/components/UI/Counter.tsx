import React from 'react';
import {HStack, IconButton, Text} from "@chakra-ui/react";
import {FaMinus, FaPlus} from "react-icons/fa";
import {useCart} from "../../context/CartContext";
import {IProduct} from "../ProductItem";

interface CounterProps {
    product: IProduct,
    quantity: number
}

const Counter = ({product, quantity, ...rest}: CounterProps) => {
    const {increaseCartQuantity, decreaseCartQuantity} = useCart();
    return (
        <HStack mx={2} borderRadius='1rem' backgroundColor='white' boxShadow='md'>
            <IconButton aria-label='Add item'
                        icon={<FaMinus/>}
                        backgroundColor='white'
                        borderRadius='1rem'
                        _focus={{boxShadow: 'none'}}
                        onClick={() => decreaseCartQuantity(product)}
            />
            <Text textAlign={"center"} flex={1} fontSize={"large"}
                  fontWeight='bold'>{quantity}</Text>
            <IconButton aria-label='Add item'
                        icon={<FaPlus/>}
                        variant='ghost'
                        borderRadius='1rem'
                        _focus={{boxShadow: 'none'}}
                        onClick={() => increaseCartQuantity(product)}
            />
        </HStack>
    );
};

export default Counter;