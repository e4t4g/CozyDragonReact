import React, {useState} from 'react';
import {Flex, Text, Textarea} from "@chakra-ui/react";
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
                    <Textarea
                        border='1px solid'
                        borderColor='gray.300'
                        fontSize='x-large'
                        rows={3}
                        py={3}
                        value={title}
                        onChange={(e) => updateTitle(e.target.value)}/>
                    <SaveIcon isDisabled={title?.length === 0}
                              onSave={() => setIsEditMode(false)}/>
                </>
            ) : (
                <>
                    <Text fontSize='xx-large' noOfLines={3}>{title}</Text>
                    <EditIcon onEdit={() => setIsEditMode(true)}/>
                </>
            )}
        </Flex>
    )
}
export default EditTitle;