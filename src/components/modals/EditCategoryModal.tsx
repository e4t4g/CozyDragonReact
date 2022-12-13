import React from 'react';
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import {ICategory} from "../../models/ICategory";

interface EditCategoryModalProps {
    category: ICategory,
    handleSelectedCategory: (name: string) => void,
    isOpen: boolean,
    onClose: () => void,
    onEditCategory: (category: ICategory) => void,
}

const EditCategoryModal = ({
                               category,
                               handleSelectedCategory,
                               isOpen,
                               onClose,
                               onEditCategory
                           }: EditCategoryModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay style={{backgroundColor: 'RGBA(0, 0, 0, 0.16)'}}/>
            <ModalContent>
                <ModalHeader borderBottom='1px solid' borderBottomColor='gray.200'>Переименовать категорию</ModalHeader>
                <ModalCloseButton/>
                <ModalBody my={4} gap={2}>
                    <Input value={category.name} onChange={(e) => handleSelectedCategory(e.target.value)}/>
                    <Input value={category.description} onChange={(e) => handleSelectedCategory(e.target.value)}/>
                </ModalBody>
                <ModalFooter>
                    <Button variant='ghost' mr={3} onClick={onClose}>
                        Отмена
                    </Button>
                    <Button disabled={category.name?.length < 2}
                            onClick={() => onEditCategory(category)}>Сохранить</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditCategoryModal;