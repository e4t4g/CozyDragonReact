import React from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import {FcGoogle} from "react-icons/fc";

interface AuthProps {
    isOpen: boolean,
    onClose: () => void,
    googleSignInHandler: () => void
}

const Auth = ({isOpen, onClose, googleSignInHandler}: AuthProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay style={{backgroundColor: 'RGBA(0, 0, 0, 0.16)'}}/>
            <ModalContent>
                <ModalHeader borderBottom='1px solid' borderBottomColor='gray.200'>Sign in to your account</ModalHeader>
                <ModalCloseButton/>
                <ModalBody my={4}>
                    <Button w='100%' leftIcon={<FcGoogle/>} onClick={() => googleSignInHandler()}>Sign in with Google</Button>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default Auth;