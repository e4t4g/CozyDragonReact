import React from 'react';
import {
    Flex,
    Avatar,
    HStack,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Text,
    IconButton,
} from '@chakra-ui/react';
import {MdFavorite} from 'react-icons/md';
import {Link} from 'react-router-dom'
import {BsBagFill} from 'react-icons/bs';
import {useCategory} from "../context/CategoryContext";
import {useCart} from "../context/CartContext";
import {formatCurrency} from "../utilities/formatCurrency";
import { ICategory } from '../models/ICategory';

const CartButton = () => {
    const {cartItems, getTotalCost} = useCart();
    return (
        <>
            {cartItems.length > 0 ?
                <Button leftIcon={<BsBagFill fontSize='x-large'/>} colorScheme='yellow' variant='solid'
                        fontSize='large'>
                    <Text as='span' pt={1} fontWeight='normal'>{formatCurrency(getTotalCost())}</Text>
                </Button>
                :
                <IconButton
                    aria-label='Корзина'
                    fontSize='x-large'
                    icon={<BsBagFill/>}
                />
            }
        </>
    )
}

const Links = [
    {title: 'Cart', icon: <CartButton/>, path: 'cart'},
    {
        title: 'Favorite',
        icon: <IconButton aria-label='Избранное' fontSize='x-large' icon={<MdFavorite/>}/>,
        path: 'favourites'
    }
];

export const Header = () => {
    const {onChangeCurrentCategory} = useCategory();

    const isAdmin = false;

    return (
        <Flex bg='gray.200'
              position='sticky'
              top='0'
              left='0'
              w='100%'
              height='80px'
              padding={5}
              boxShadow='md'
              alignItems='center'
              justifyContent='space-between'
              zIndex={100}
        >
            <Link to='/all' onClick={() => onChangeCurrentCategory({} as ICategory)}>
                <Flex alignItems='center' color='gray.600' textTransform={"uppercase"} ml={4}>
                    <svg width="52" height="52"
                         xmlns="http://www.w3.org/2000/svg">
                        <image href="/imgs/logo.svg" height="52" width="52"/>
                    </svg>
                    <Text ml={2} fontStyle='italic' as='h1' fontSize='xx-large'>GB Store</Text>
                </Flex>
            </Link>
            <Flex alignItems={'center'}>
                {<HStack
                    as={'nav'}
                    spacing={2}
                    marginX={6}
                    fontSize='25px'>
                    {!isAdmin && Links.map(({title, icon, path}) => (
                        <Link to={path} key={title}>
                            {icon}
                        </Link>
                    ))}
                </HStack>}
                <Menu>
                    <MenuButton
                        as={Button}
                        rounded={'full'}
                        variant={'link'}
                        cursor={'pointer'}
                        minW={0}>
                        <Avatar
                            size={'sm'}
                            src={
                                'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                            }
                        />
                    </MenuButton>
                    <MenuList>
                        {!isAdmin && <MenuItem>Мои заказы</MenuItem>}
                        <MenuDivider/>
                        <MenuItem>Выйти</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    );
}