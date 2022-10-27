import React, {useState} from 'react';
import {SaveIcon} from "../UI/SaveIcon";
import {Flex, Text, Textarea} from "@chakra-ui/react";
import {EditIcon} from "../UI/EditIcon";

interface EditDescriptionProps {
    description: string,
    updateDescription: (v: string) => void
}

export const EditDescription = ({description, updateDescription}: EditDescriptionProps) => {
    const [isDescEditMode, setIsDescEditMode] = useState(false);
    return (
        <Flex gap={2} alignItems='center' w='100%'>
            {isDescEditMode ? (
                <>
                    <Textarea
                        borderColor='gray.300'
                        rows={6}
                        py={3}
                        value={description}
                        _focus={{borderColor: 'yellow.500'}}
                        onChange={(e) => updateDescription(e.target.value)}/>

                    <SaveIcon isDisabled={description.length === 0}
                              onSave={() => setIsDescEditMode(false)}/>
                </>
            ) : (
                <>
                    <Text onClick={() => setIsDescEditMode(true)} cursor='text'>{description}</Text>
                    <EditIcon onEdit={() => setIsDescEditMode(true)}/>
                </>
            )}
        </Flex>
    );
};
