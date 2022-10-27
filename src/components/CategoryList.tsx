import {Box, Button, Flex, Skeleton, Stack, useDisclosure} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {NavItem} from './UI/NavItem';
import {useCategory} from '../context/CategoryContext';
import {ICategory} from '../models/ICategory';
import {isEmpty} from '../utilities/isEmpty';
import {DeleteIcon, EditIcon} from '@chakra-ui/icons';
import ErrorMessage from './UI/ErrorMessage';
import {AiOutlineReload} from "react-icons/ai";
import RemoveCategoryModal from './modals/RemoveCategoryModal';
import EditCategoryModal from "./modals/EditCategoryModal";
import {ToastError, ToastSuccess} from '../utilities/error-handling';

export const CategoryList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const editDisclosure = useDisclosure()
    const removeDisclosure = useDisclosure()
    const {currentCategory, categories, onChangeCurrentCategory, onChangeCategories} = useCategory();
    const [selectedCategory, setSelectedCategory] = useState({} as ICategory);
    const [error, setError] = useState('');

    const isAdmin = false;

    const fetchCategories = async () => {
        setIsLoading(true)
        await axios.get('https://api.escuelajs.co/api/v1/categories')
            .then(response => {
                let result = response.data;
                onChangeCategories(result);
            }).catch(error => {
                setError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const onRemoveCategory = async (id: number) => {
        await axios.delete(`https://api.escuelajs.co/api/v1/categories/${id}`)
            .then(() => {
                fetchCategories();
                ToastSuccess('The category has been removed successfully');
            })
            .catch(error => {
                ToastError(error.message);
            })
            .finally(() => {
                removeDisclosure.onClose();
            })
    }

    const onEditCategory = async (category: ICategory) => {
        await axios.put(
            `https://api.escuelajs.co/api/v1/categories/${category.id}`,
            {"name": category.name}
        )
            .then(() => {
                fetchCategories();
                ToastSuccess('The category has been updated successfully');
            })
            .catch(error => {
                ToastError(error.message);
            })
            .finally(() => {
                editDisclosure.onClose();
            })
    }

    const updateList = () => {
        setError('');
        fetchCategories();
    }

    if (error) {
        return (
            <>
                <ErrorMessage message={error}/>
                <Button
                    m={5}
                    leftIcon={<AiOutlineReload/>}
                    onClick={() => updateList()}>
                    Обновить страницу
                </Button>
            </>
        )
    }

    if (isLoading) {
        return (
            <Stack spacing={5} mt={4} pl={4}>
                {Array(5)
                    .fill(null)
                    .map((_, index) => <Skeleton key={index} height='56px'/>)}
            </Stack>
        )
    }

    return (
        <>
            {!isLoading && <Box
                bg='white'
                borderRight='1px'
                position='sticky'
                top='80px'
                py={4}
                height='calc(100vh - 80px)'
                borderRightColor='gray.200'
                overflowY='auto'>
                {isAdmin && <Button mx={2} mb={2}>Добавить категорию</Button>}
                <NavItem
                    fontWeight={isEmpty(currentCategory) ? '800' : '400'}
                    onClick={() => onChangeCurrentCategory({} as ICategory)}
                >
                    All
                </NavItem>
                {categories?.map((category) => (
                    <Flex
                        w='100%'
                        alignItems='center'
                        color='gray.400'
                        _hover={{backgroundColor: 'gray.400', color: 'gray.600'}}>
                        <NavItem
                            key={category.id}
                            fontWeight={currentCategory.name === category.name ? '800' : '400'}
                            onClick={() => onChangeCurrentCategory(category)}
                        >
                            {category.name}
                        </NavItem>

                        {isAdmin &&
                            <EditIcon mr={2} fontSize='xl' cursor='pointer' _hover={{color: 'white'}}
                                      onClick={() => {
                                          setSelectedCategory(category);
                                          editDisclosure.onOpen();
                                      }}/>}
                        {isAdmin &&
                            <DeleteIcon mr={2} fontSize='xl' cursor='pointer' _hover={{color: 'white'}}
                                        onClick={() => {
                                            setSelectedCategory(category);
                                            removeDisclosure.onOpen();
                                        }}/>}
                        <EditCategoryModal
                            isOpen={editDisclosure.isOpen}
                            onClose={editDisclosure.onClose}
                            category={selectedCategory}
                            handleSelectedCategory={(e) => setSelectedCategory({...selectedCategory, name: e})}
                            onEditCategory={onEditCategory}
                        />
                        <RemoveCategoryModal
                            isOpen={removeDisclosure.isOpen}
                            onClose={removeDisclosure.onClose}
                            category={selectedCategory}
                            onRemoveCategory={onRemoveCategory}
                        />
                    </Flex>
                ))}
            </Box>}
        </>
    );
};
