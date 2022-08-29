import React from 'react';
import {Flex, Icon} from "@chakra-ui/react";
import {FaHeart, FaRegHeart} from "react-icons/fa";

interface FavouriteSwitcherProps {
    isFav: boolean
}

export const FavouriteSwitcher = ({isFav}: FavouriteSwitcherProps) => {

    const onAddFavourite = () => {
    }

    const onDeleteFavourite = () => {
    }

    return (
        <Flex
            position='absolute'
            right={2}
            top={2}
            borderRadius='50%'
            alignItems='center'
            justifyContent='center'
            backgroundColor='white'
            h='40px'
            w='40px'
            color='gray.400'
            fontSize='x-large'
            cursor='pointer'
            boxShadow='lg'
            _hover={{color: 'gray.500'}}
            onClick={() => isFav ? onDeleteFavourite() : onAddFavourite()}
        >
            {isFav ? (
                <Icon as={FaHeart}/>
            ) : (
                <Icon as={FaRegHeart}/>
            )}
        </Flex>
    );
};