import React from 'react';
import {Button, HStack, Image, Text, VStack} from "@chakra-ui/react";

interface AuthSocialButtonsProps {
    signInHandler: (source: string) => void
}

const AuthSocialButtons = ({signInHandler}: AuthSocialButtonsProps) => {
    return (
        <VStack spacing={3}>
            <Text>Войти с помощью</Text>
            <HStack justifyContent='center' spacing={3}>
                <Button size='lg' variant='outline' borderRadius='50%' p={0}
                        onClick={() => signInHandler('google')}>
                    <Image h={7} src={'/imgs/google-logo.svg'} alt='Google Icon'/>
                </Button>
                <Button size='lg' variant='outline' borderRadius='50%' p={0}
                        onClick={() => signInHandler('yandex')}>
                    <Image h={8} src={'/imgs/ya-logo.svg'} alt='Yandex Icon'/>
                </Button>
            </HStack>
        </VStack>
    );
};

export default AuthSocialButtons;