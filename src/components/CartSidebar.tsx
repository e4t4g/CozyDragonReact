import {
    Text,
    Heading,
    List,
    ListItem,
    Flex,
    Image,
    Button,
    HStack, Icon
} from '@chakra-ui/react';
import React from 'react';
import {useCart} from "../context/CartContext";
import {formatCurrency} from "../utilities/formatCurrency";
import {Link} from "react-router-dom";
import Counter from "./UI/Counter";
import {BsBag} from "react-icons/bs";

const CartSidebar = () => {
    const {cartItems} = useCart();

    const CartList = () => (
        <>
            {cartItems.length > 0
                ? <List flexGrow={1} spacing={3} overflowY='auto' py={5} mr={1}>
                    {cartItems.map(({product, quantity}) => (
                        <ListItem key={product.id}>
                            <HStack spacing={3}>
                                <Link to={`/${product.id}/${product.title}`}
                                      style={{display: "flex", alignItems: 'center', flex: 1}}>
                                    <Flex maxH='100px'
                                          maxW='100px'
                                          justifyContent='center'
                                          p={1}
                                    >
                                        <Image
                                            maxH='100%'
                                            maxW='100%'
                                            objectFit={'contain'}
                                            src={product.image}
                                        />
                                    </Flex>
                                    <Flex gap={2} flexDirection='column'>
                                        <Text fontSize='sm' noOfLines={3}>{product.title}</Text>
                                        <Text fontSize='sm'
                                              color='gray.500'>{formatCurrency(Number(product.price))}</Text>
                                    </Flex>
                                </Link>
                                <Counter product={product} quantity={quantity}/>
                            </HStack>
                        </ListItem>
                    ))}
                </List>
                :
                <Flex flex={1} flexDirection='column' alignItems='center' justifyContent='center'>
                    <Icon fontSize='100px' color='gray.400' as={BsBag}/>
                    <Heading fontSize='large' mt={6} mb={3}>В вашей корзине пока пусто</Heading>
                    <Text>Тут появятся товары, которые вы закажете.</Text>
                </Flex>
            }
        </>
    );

    const CartLink = () => (
        <>
            {cartItems.length > 0 &&
                <Link to={'cart'}>
                    <Button
                        fontWeight='normal'
                        colorScheme='yellow'
                        justifyContent='space-between'
                        py={6}
                        mt={4}
                        borderRadius='16px'
                        w='100%'
                    >
                        Перейти в корзину&nbsp;
                        <Text as={"span"} fontSize='xl' fontWeight='bold'>
                            {formatCurrency(
                                cartItems.reduce((total, cartItem) => {
                                    return total + cartItem.quantity * Number(cartItem?.product?.price)
                                }, 0)
                            )}
                        </Text>
                    </Button>
                </Link>
            }
        </>
    )

    return (
        <Flex
            textAlign={"left"}
            position={"sticky"}
            top='80px'
            padding={4}
            height='calc(100vh - 80px)'
            overflow='hidden'
            flexDirection='column'
            bg='gray.100'
            borderLeft="1px"
            borderLeftColor='gray.200'
        >
            <Heading>Корзина</Heading>
            <CartList/>
            <CartLink/>
        </Flex>

    );
};

export default CartSidebar;