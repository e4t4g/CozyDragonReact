import {Box} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {NavItem} from "./UI/NavItem";
import {useCategory} from "../context/CategoryContext";

export const Sidebar = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {currentCategory, categories, onChangeCurrentCategory, onChangeCategories} = useCategory();

    const fetchCategories = async () => {
        setIsLoading(true)
        await axios.get('https://fakestoreapi.com/products/categories')
            .then(response => {
                let result = response.data;
                result.unshift('all');
                onChangeCategories(result);
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
            borderRightColor='gray.200'>
            {!isLoading && categories.map((category) => (
                <NavItem
                    key={category}
                    fontWeight={currentCategory === category ? '800' : '400'}
                    onClick={() => onChangeCurrentCategory(category)}
                >
                    {category}
                </NavItem>
            ))}
        </Box>
    );
};

