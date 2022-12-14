import React, {useState} from 'react';
import {Box, Flex, Image, Input} from "@chakra-ui/react";
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
              minW='200px'
              flex={2}
              position='relative'
        >
            {!isEditMode && <>
                <Box position='absolute'
                     right={2}
                     top={2}>
                    <EditIcon onEdit={() => setIsEditMode(true)}/>
                </Box>
                <Image
                    maxH='100%'
                    maxW='100%'
                    objectFit={'contain'}
                    src={image}
                    fallbackSrc={'/imgs/placeholder-image.jpg'}
                />
            </>}

            {isEditMode && <Flex flex={1} mt={2} mr={2}>
                <Input
                    value={image}
                    mr={3}
                    variant='flushed'
                    borderBottomWidth='2px'
                    _focus={{borderBottom: '2px solid', borderBottomColor: 'yellow.500'}}
                    onChange={e => updateImage(e.target.value)}/>
                <SaveIcon onSave={() => setIsEditMode(false)}/>
            </Flex>}
        </Flex>
    );
};
