import React from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react';
import {IUser} from "../../models/IUser";
import AuthSocialButtons from '../auth/AuthSocialButtons';
import SignInByEmailForm from "../auth/SignInByEmailForm";


interface AuthProps {
    isOpen: boolean,
    onClose: () => void,
    signInHandler: (source: string) => void
    signInByEmail: (data: IUser) => void
}

const Auth = ({isOpen, onClose, signInHandler, signInByEmail}: AuthProps) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay style={{backgroundColor: 'RGBA(0, 0, 0, 0.7)'}}/>
            <ModalContent>
                <ModalHeader borderBottom='1px solid' borderBottomColor='gray.200'>Войти</ModalHeader>
                <ModalCloseButton/>
                <ModalBody my={4} textAlign='center'>
                    <SignInByEmailForm signInByEmail={signInByEmail}/>
                    <Button w='100%' mt={4} mb={8} colorScheme='gray' variant='outline'>Создать аккаунт</Button>
                    <AuthSocialButtons signInHandler={signInHandler}/>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default Auth;