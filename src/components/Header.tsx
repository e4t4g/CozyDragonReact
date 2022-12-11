import React, {useState} from 'react';
import {
    Avatar,
    Button,
    Flex,
    HStack,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import {useCategory} from "../context/CategoryContext";
import {ICategory} from '../models/ICategory';
import Auth from './modals/Auth';
import axios from "axios";
import {ToastError, ToastSuccess} from "../utilities/error-handling";
import {IUser} from "../models/IUser";
import { Links } from './cart/Links';
import { isAdmin } from '../constants/isAdmin';

export const Header = () => {
    const {onChangeCurrentCategory} = useCategory();

    const [isAuth, setIsAuth] = useState(false);
    const signInDisclosure = useDisclosure();
    const signUpDisclosure = useDisclosure();

    const signInBySocial = async (source: string) => {
        await axios.get(
            `/user/login/${source}`
        )
            .then(({data}) => {
                console.log(data);
                ToastSuccess('Вы успешно авторизовались');
                setIsAuth(true);
            })
            .catch(error => {
                ToastError(error.message);
            })
            .finally(() => {
                signInDisclosure.onClose();
            })
    }

    const signInByEmail = async ({email, password}: IUser) => {
        await axios.post(
            `/user/login/`, {
                email, password
            }
        )
            .then(({data}) => {
                console.log(data);
                ToastSuccess('Вы успешно авторизовались');
                setIsAuth(true);
            })
            .catch(error => {
                ToastError(error.message);
            })
            .finally(() => {
                signInDisclosure.onClose();
            })
    }

    return (
        <Flex bg='gray.100'
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
                <Flex alignItems='center' color='gray.500' textTransform={"uppercase"} ml={4}>
                    <svg width="52" height="52"
                         xmlns="http://www.w3.org/2000/svg">
                        <image href="/imgs/logo.svg" height="52" width="52"/>
                    </svg>
                    <Text ml={2} as='h1' fontSize='4xl' fontWeight='thin'>
                        GB Store
                    </Text>
                </Flex>
            </Link>
            <Flex alignItems={'center'}>
                {!isAuth && <HStack>
                    <Button onClick={signInDisclosure.onOpen} backgroundColor='gray.300' px={6}>Войти</Button>
                    <Button onClick={signUpDisclosure.onOpen} colorScheme={"yellow"} px={6}>Регистрация</Button>
                </HStack>}

                {isAuth && <>
                    <HStack
                        as={'nav'}
                        spacing={2}
                        marginX={6}
                        fontSize='25px'>
                        {!isAdmin && Links.map(({title, icon, path}) => (
                            <Link to={path} key={title}>
                                {icon}
                            </Link>
                        ))}
                    </HStack>
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
                            {!isAdmin && isAuth && <MenuItem>Мои заказы</MenuItem>}
                            {isAuth && <MenuDivider/>}
                            {isAuth && <MenuItem>Выйти</MenuItem>}
                        </MenuList>
                    </Menu>
                </>}
            </Flex>

            <Auth isOpen={signInDisclosure.isOpen}
                  onClose={signInDisclosure.onClose}
                  signInHandler={signInBySocial}
                  signInByEmail={signInByEmail}/>
        </Flex>
    );
}