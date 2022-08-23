import {Box, BoxProps} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {NavItem} from "./UI/NavItem";

interface SidebarProps extends BoxProps {
    currentCategory: string,
    selectCategory: (category: string) => void
}

export const Sidebar = ({currentCategory, selectCategory, ...rest}: SidebarProps) => {
    const [categories, setCategories] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCategories = async () => {
        setIsLoading(true)
        await axios.get('https://fakestoreapi.com/products/categories')
            .then(response => {
                let result = response.data;
                result.unshift('All');
                setCategories(result);
            }).catch(error => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <Box
            bg='white'
            borderRight="1px"
            position={"sticky"}
            top='80px'
            py={4}
            height='calc(100vh - 80px)'
            borderRightColor='gray.200'
            {...rest}>
            {!isLoading && categories.map((category) => (
                <NavItem
                    key={category}
                    fontWeight={currentCategory === category ? '800' : '400'}
                    onClick={() => selectCategory(category)}
                >
                    {category}
                </NavItem>
            ))}
        </Box>
    );
};

