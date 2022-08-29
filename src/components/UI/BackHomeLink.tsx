import React from 'react';
import {Icon} from "@chakra-ui/react";
import {MdArrowBackIosNew} from "react-icons/md";
import {Link} from "react-router-dom";

export const BackHomeLink = () => {
    return (
        <Link to='/' style={{color: 'gray', display: 'flex', alignItems: 'center', marginLeft: '-20px'}}>
            <Icon as={MdArrowBackIosNew} mr={1}/>Вернуться в каталог
        </Link>
    );
};