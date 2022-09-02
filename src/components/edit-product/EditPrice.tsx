import React, {useState} from 'react';
import {Flex, Input, Text} from "@chakra-ui/react";
import {SaveIcon} from "../UI/SaveIcon";
import {formatCurrency} from "../../utilities/formatCurrency";
import {EditIcon} from "../UI/EditIcon";

interface EditPriceProps {
    price: string,
    updatePrice: (v: string) => void
}

export const EditPrice = ({price, updatePrice}: EditPriceProps) => {
    const [isEditMode, setIsEditMode] = useState(false);
    return (
        <Flex
            border='1px solid' borderColor='gray.300' borderRadius='32px' px={5} py={3} gap={4} alignItems='center'>
            {isEditMode ? (
                <>
                    <Input
                        px={4}
                        py={4}
                        m={0}
                        width='150px'
                        fontSize='x-large'
                        value={price}
                        type={"number"}
                        onChange={(e) => updatePrice(e.target.value)}/>
                    <SaveIcon isDisabled={price.length === 0}
                              onSave={() => setIsEditMode(false)}/>
                </>
            ) : (
                <>
                    <Text fontSize='x-large'>{formatCurrency(Number(price))}</Text>
                    <EditIcon onEdit={() => setIsEditMode(true)}/>
                </>
            )}
        </Flex>
    );
};
