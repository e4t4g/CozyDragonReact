import React from 'react';
import {useCart} from "../context/CartContext";
import {
    Box,
    Button,
    Flex,
    FormControl,
    Heading,
    HStack,
    Icon,
    Image,
    Input,
    InputGroup,
    InputLeftAddon,
    InputLeftElement,
    List,
    ListItem,
    Spacer,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Textarea,
    Tfoot,
    Th,
    Tr,
    VStack
} from "@chakra-ui/react";
import {formatCurrency} from "../utilities/formatCurrency";
import {Link} from 'react-router-dom';
import {BsBag, BsPerson} from 'react-icons/bs';
import {MdOutlineEmail} from 'react-icons/md';
import {BiHomeAlt} from 'react-icons/bi';
import Counter from "../components/UI/Counter";
import MainBlockLayout from "../components/MainBlockLayout";

export const Cart = () => {
    const {cartItems} = useCart();

    const deliveryCost = 100;

    const TotalCostTable = () => (
        <TableContainer mx='-20px' mt={2} mb={4}>
            <Table variant='unstyled'>
                <Tbody borderTop='1px solid' borderColor='gray.200'>
                    <Tr>
                        <Td>Товары</Td>
                        <Td fontWeight='bold'>
                            {formatCurrency(
                                cartItems.reduce((total, cartItem) => {
                                    return total + cartItem.quantity * Number(cartItem?.product?.price)
                                }, 0)
                            )}
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>Доставка</Td>
                        <Td fontWeight='bold'>{formatCurrency(deliveryCost)}</Td>
                    </Tr>
                </Tbody>
                <Tfoot>
                    <Tr borderTop='1px solid' borderColor='gray.200'>
                        <Th fontSize='large' fontWeight='bold'>К оплате</Th>
                        <Th isNumeric fontSize='large' fontWeight='bold'>
                            {formatCurrency(
                                cartItems.reduce((total, cartItem) => {
                                    return total + cartItem.quantity * Number(cartItem?.product?.price)
                                }, 0) + deliveryCost
                            )}
                        </Th>
                    </Tr>
                </Tfoot>
            </Table>
        </TableContainer>
    );

    const OrderForm = () => (
        <VStack spacing={3} pr={5}>
            <FormControl id="name">
                <InputGroup borderColor="#E0E1E7">
                    <InputLeftElement
                        pointerEvents="none"
                        children={<BsPerson color="gray.800"/>}
                    />
                    <Input type="text" size="md" placeholder='Ваше имя'/>
                </InputGroup>
            </FormControl>
            <FormControl id="address">
                <InputGroup borderColor="#E0E1E7">
                    <InputLeftElement
                        pointerEvents="none"
                        children={<BiHomeAlt color="gray.800"/>}
                    />
                    <Input type="text" size="md" placeholder='Улица, номер дома, номер квартиры'/>
                </InputGroup>
            </FormControl>

            <FormControl id="mail">
                <InputGroup borderColor="#E0E1E7">
                    <InputLeftElement
                        pointerEvents="none"
                        children={<MdOutlineEmail color="gray.800"/>}
                    />
                    <Input type="text" size="md" placeholder='Email'/>
                </InputGroup>
            </FormControl>
            <FormControl id="phone">
                <InputGroup borderColor="#E0E1E7">
                    <InputGroup>
                        <InputLeftAddon children='+7'/>
                        <Input type='tel' placeholder='Номер телефона'/>
                    </InputGroup>
                </InputGroup>
            </FormControl>
            <FormControl id="comment">
                <Textarea
                    placeholder="Комментарий курьеру"
                />
            </FormControl>
            <FormControl id="name" float="right">
                <Button
                    variant="solid"
                    colorScheme='yellow'>
                    Отправить заказ
                </Button>
            </FormControl>
        </VStack>
    );

    const EmptyCart = () => (
        <Flex flexDirection='column' alignItems='center' gap={4} mt={10}>
            <Icon fontSize='140px' color='gray.400' as={BsBag}/>
            <Heading fontSize='xx-large' my={2}>В вашей корзине пока пусто</Heading>
            <Text color='gray'>Тут появятся товары, которые вы закажете.</Text>
            <Link to='/'>
                <Button colorScheme='yellow' px={10} mt={10}>
                    В каталог
                </Button>
            </Link>
        </Flex>
    );

    const OrderList = () => (
        <Box flex={1} overflow='hidden' height='calc(100vh - 300px)'>
            <List overflow='auto' height='100%'>
                {cartItems.map(({product, quantity}) => (
                    <ListItem key={product.id} p={3}>
                        <HStack spacing={3}>
                            <Link to={`/${product.id}/${product.title}`} style={{display: "flex", alignItems: 'center'}}>
                                <Flex maxH='100px'
                                      maxW='100px'
                                      justifyContent='center'
                                >
                                    <Image
                                        maxH='100%'
                                        maxW='100%'
                                        objectFit={'contain'}
                                        src={product.image}
                                    />
                                </Flex>
                                <Flex flexGrow={1} flexDirection='column'>
                                    <Text fontSize='sm'>{product.title}</Text>
                                    <Text fontSize='sm'
                                          color='gray.500'>{formatCurrency(Number(product.price))}</Text>
                                </Flex>
                            </Link>
                            <Spacer/>
                            <Counter product={product} quantity={quantity}/>
                        </HStack>
                    </ListItem>
                ))}
            </List>
        </Box>
    )

    return (
        <MainBlockLayout title={'Корзина'}>
            {cartItems.length > 0 ? (
                <Flex gap={10} borderTop='1px solid' borderColor='gray.200' pt={2}>
                    <OrderList/>
                    <Box flex={1} overflow={"auto"}>
                        <Heading fontSize='x-large' mb={2}>Итого</Heading>
                        <Text color='gray'>Доставка 15–30 мин. Оплата при получении картой или наличными.</Text>
                        <TotalCostTable/>
                        <Heading fontSize='x-large' mb={4}>Адрес доставки</Heading>
                        <OrderForm/>
                    </Box>
                </Flex>
            ) : (
                <EmptyCart/>
            )}
        </MainBlockLayout>
    );
};