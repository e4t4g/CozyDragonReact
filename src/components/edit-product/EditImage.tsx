import React, {useState} from 'react';
import {Box, Flex, Image} from "@chakra-ui/react";
import {EditIcon} from "../UI/EditIcon";
import {SaveIcon} from "../UI/SaveIcon";

interface EditImageProps {
    image: string,
    updateImage: (v: string) => void
}

export const EditImage = ({image, updateImage}: EditImageProps) => {
    const [isEditMode, setIsEditMode] = useState(false);

    return (
        <Flex maxH='400px'
              maxW='400px'
              justifyContent='center'
              flex={2}
              position='relative'
        >
            <Box position='absolute'
                 right={2}
                 top={2}>
                {isEditMode ? <SaveIcon onSave={() => setIsEditMode(false)}/>
                    : <EditIcon isDisabled={true} onEdit={() => setIsEditMode(true)}/>}
            </Box>

            <Image
                maxH='100%'
                maxW='100%'
                objectFit={'contain'}
                src={image}
            />
        </Flex>
    );
};
