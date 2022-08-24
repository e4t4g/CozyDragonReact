import React from 'react';
import {Link as ChakraLink} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/react";
import {MdArrowBackIosNew} from "react-icons/md";
import {Link} from "react-router-dom";

export const BackHomeLink = () => {
    return (
        <Link to='/'>
            <ChakraLink
                color='gray'
                display='flex'
                alignItems='center'
                ml='-20px'>
                <Icon as={MdArrowBackIosNew} mr={1}/>Вернуться в каталог</ChakraLink>
        </Link>
    );
};