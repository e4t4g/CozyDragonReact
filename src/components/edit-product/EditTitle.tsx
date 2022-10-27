import React, {useState} from 'react';
import {Flex, Input, Text} from "@chakra-ui/react";
import {SaveIcon} from "../UI/SaveIcon";
import {EditIcon} from "../UI/EditIcon";

interface EditTitleProps {
    title: string,
    updateTitle: (v: string) => void
}

const EditTitle = ({title, updateTitle}: EditTitleProps) => {
    const [isEditMode, setIsEditMode] = useState(false);

    return (
        <Flex gap={2} alignItems='center' w='100%'>
            {isEditMode ? (
                <>
                    <Input
                        value={title}
                        fontSize='x-large'
                        _focus={{borderColor: 'yellow.500'}}
                        onChange={(e) => updateTitle(e.target.value)}/>
                    <SaveIcon isDisabled={title?.length === 0}
                              onSave={() => setIsEditMode(false)}/>
                </>
            ) : (
                <>
                    <Text fontSize='x-large' noOfLines={3} onClick={() => setIsEditMode(true)}>{title}</Text>
                    <EditIcon onEdit={() => setIsEditMode(true)}/>
                </>
            )}
        </Flex>
    )
}
export default EditTitle;