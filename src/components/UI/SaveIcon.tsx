import {IconButton} from '@chakra-ui/react';
import React from 'react';
import {MdDone} from "react-icons/md";

interface SaveIconProps {
    onSave: () => void
    isDisabled?: boolean
}

export const SaveIcon = ({onSave, isDisabled}: SaveIconProps) => {
    return (
        <IconButton icon={<MdDone/>}
                    aria-label='Сохранить'
                    backgroundColor='white'
                    color='gray.500'
                    border='1px solid'
                    borderColor='gray.300'
                    borderRadius='50%'
                    fontSize='xx-large'
                    disabled={isDisabled}
                    _hover={{color: 'yellow.500', boxShadow: 'lg'}}
                    _focus={{boxShadow: 'none'}}
                    onClick={onSave}/>
    );
}

