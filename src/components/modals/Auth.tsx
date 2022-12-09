import React from 'react';
import {
    Button,
    FormControl,
    HStack,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    VStack
} from '@chakra-ui/react';
import {Field, Form, Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';

export interface Values {
    email: string;
    password: string;
}

interface AuthProps {
    isOpen: boolean,
    onClose: () => void,
    signInHandler: (source: string) => void
}

const Auth = ({isOpen, onClose, signInHandler}: AuthProps) => {

    const ValidationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Пожалуйста, введите корректный  email')
            .required('Пожалуйста, введите ваш E-mail'),
        password: Yup.string()
            .min(8, 'Пароль должен содержать минимум 8 символов')
            .max(16, 'Пароль может содержать максимум 16 символов')
            .required('Пожалуйста, введите ваш пароль'),

    });

    const SignInWithEmailForm = () => (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={ValidationSchema}
            onSubmit={async (
                values: Values,
                {setSubmitting}: FormikHelpers<Values>
            ) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 1000);

            }}
        >
            {({isValid, dirty}) => (
                <Form>
                    <Stack spacing={4} textAlign='left'>
                        <FormControl>
                            <Field name='email'>
                                {({field, meta}: any) => (
                                    <>
                                        <Input type='email'
                                               placeholder='E-mail'
                                               mb={2}
                                               isInvalid={meta.touched ? meta.error : false} {...field} />
                                        {meta.touched && meta.error && (
                                            <Text color='red.400' fontSize='md'>{meta.error}</Text>
                                        )}
                                    </>
                                )}
                            </Field>
                        </FormControl>
                        <FormControl>
                            <Field name='password'>
                                {({field, meta}: any) => (
                                    <>
                                        <Input type='password'
                                               placeholder='Пароль'
                                               mb={2}
                                               isInvalid={meta.touched ? meta.error : false} {...field} />
                                        {meta.touched && meta.error && (
                                            <Text color='red.400' fontSize='md'>{meta.error}</Text>
                                        )}
                                    </>
                                )}
                            </Field>
                        </FormControl>
                        <Button type='submit' colorScheme='yellow' isDisabled={!isValid || !dirty}>Войти</Button>
                    </Stack>
                </Form>
            )}
        </Formik>
    )

    const AuthSocialButtons = () => (
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
    )

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay style={{backgroundColor: 'RGBA(0, 0, 0, 0.7)'}}/>
            <ModalContent>
                <ModalHeader borderBottom='1px solid' borderBottomColor='gray.200'>Войти</ModalHeader>
                <ModalCloseButton/>
                <ModalBody my={4} textAlign='center'>
                    <SignInWithEmailForm/>
                    <Button w='100%' mt={4} mb={8} colorScheme='gray' variant='outline'>Создать аккаунт</Button>
                    <AuthSocialButtons/>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default Auth;