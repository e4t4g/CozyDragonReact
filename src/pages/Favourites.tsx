import {Button, Flex, Heading, Icon} from '@chakra-ui/react';
import React from 'react';
import {Link as ChakraLink, Text} from "@chakra-ui/react";
import {MdArrowBackIosNew, MdFavorite} from "react-icons/md";
import {IoIosHeartEmpty} from "react-icons/io";
import {Link} from "react-router-dom";

export const Favourites = () => {
    return (
        <Flex flexDirection='column' flex={1} mx='auto' w='70%' maxW='960px' minHeight='calc(100vh - 80px - 61px)'
              pt={6}>
            <Link to='/'>
                <ChakraLink color='gray' display='flex' alignItems='center' ml='-20px'><Icon as={MdArrowBackIosNew}
                                                                                             mr={1}/>Вернуться в каталог</ChakraLink>
            </Link>
            <Heading my={5}>Избранное</Heading>

            <Flex alignItems='center' justifyContent='center' gap={4} flexDirection='column' mt={10}>
                <Icon fontSize='140px' color='gray.400' as={IoIosHeartEmpty}/>
                <Heading fontSize='xx-large' my={2}>В избранном ничего нет</Heading>
                <Text color='gray' textAlign='center'>Здесь пока ничего нет, но вы можете
                    <br/>добавить товар в избранное, кликнув на <Icon as={MdFavorite}/></Text>
                <Link to='/'>
                    <Button colorScheme='yellow' px={10} mt={6}>
                        В каталог
                    </Button>
                </Link>
            </Flex>
        </Flex>
    );
};