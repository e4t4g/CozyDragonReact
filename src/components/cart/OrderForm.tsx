import React from 'react';
import {
    Button,
    FormControl,
    Input,
    InputGroup,
    InputLeftAddon,
    InputLeftElement, Text,
    Textarea,
    VStack
} from "@chakra-ui/react";
import {BsPerson} from "react-icons/bs";
import {BiHomeAlt} from "react-icons/bi";
import {MdOutlineEmail} from "react-icons/md";
import {Field, Form, Formik, FormikHelpers} from "formik";
import * as Yup from "yup";
import {useCart} from "../../context/CartContext";

interface Values {
    name: string;
    address: string;
    email: string;
    phone: string;
    comment: string;
}

export const OrderForm = () => {
    const {cartItems} = useCart();

    const ValidationSchema = Yup.object().shape({
        name: Yup.string()
            .min(5, 'Пожалуйста, введите не меньше 5 символов')
            .max(70, 'Пожалуйста, введите не более 70 символов')
            .required('Пожалуйста, заполните обязательное поле'),
        address: Yup.string()
            .min(5, 'Пожалуйста, введите не меньше 5 символов')
            .max(70, 'Пожалуйста, введите не более 100 символов')
            .required('Пожалуйста, заполните обязательное поле'),
        email: Yup.string()
            .email('Введен некорректный email')
            .required('Пожалуйста, заполните обязательное поле'),
        phone: Yup.string()
            .required('Пожалуйста, заполните обязательное поле')
    });

    return (
        <Formik
            initialValues={{
                name: '',
                address: '',
                email: '',
                phone: '',
                comment: '',
            }}
            validationSchema={ValidationSchema}
            onSubmit={(
                values: Values,
                {setSubmitting}: FormikHelpers<Values>
            ) => {
                const order = Object.assign({}, [cartItems], values);
                console.log(order)
                setSubmitting(false);
            }}
        >
            <Form>
                <VStack spacing={3} px={1} alignItems='start'>
                    <FormControl id="name">
                        <Field name="name">
                            {({field, meta}: any) => (
                                <>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<BsPerson color="gray.800"/>}
                                        />
                                        <Input type="text"
                                               placeholder="Введите Ваше имя..."
                                               isInvalid={meta.touched ? meta.error : false} {...field} />
                                    </InputGroup>
                                    {meta.touched && meta.error && (
                                        <Text color='red.400' fontSize='sm' mt={1}>{meta.error}</Text>
                                    )}
                                </>
                            )}
                        </Field>
                    </FormControl>
                    <FormControl id="address">
                        <Field name="address">
                            {({field, meta}: any) => (
                                <>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<BiHomeAlt color="gray.800"/>}
                                        />
                                        <Input type="text"
                                               placeholder="Город, улица, номер дома, номер квартиры"
                                               isInvalid={meta.touched ? meta.error : false} {...field} />

                                    </InputGroup>
                                    {meta.touched && meta.error && (
                                        <Text color='red.400' fontSize='sm' mt={1}>{meta.error}</Text>
                                    )}
                                </>
                            )}
                        </Field>
                    </FormControl>
                    <FormControl id="email">
                        <Field name="email">
                            {({field, meta}: any) => (
                                <>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<MdOutlineEmail color="gray.800"/>}
                                        />
                                        <Input type="email"
                                               placeholder="Введите ваш адрес электронной почты..."
                                               isInvalid={meta.touched ? meta.error : false} {...field} />
                                    </InputGroup>
                                    {meta.touched && meta.error && (
                                        <Text color='red.400' fontSize='sm' mt={1}>{meta.error}</Text>
                                    )}
                                </>
                            )}
                        </Field>
                    </FormControl>
                    <FormControl id="phone">
                        <Field name="phone">
                            {({field, meta}: any) => (
                                <>
                                    <InputGroup>
                                        <InputLeftAddon children='+7'/>
                                        <Input type="tel"
                                               placeholder="Введите номер телефона..."
                                               isInvalid={meta.touched ? meta.error : false} {...field} />
                                    </InputGroup>
                                    {meta.touched && meta.error && (
                                        <Text color='red.400' fontSize='sm' mt={1}>{meta.error}</Text>
                                    )}
                                </>
                            )}
                        </Field>
                    </FormControl>
                    <FormControl id="comment">
                        <Field name="comment">
                            {({field, meta}: any) => (
                                <>
                                    <Textarea
                                        placeholder="Комментарий курьеру" {...field}
                                    />
                                    {meta.touched && meta.error && (
                                        <Text color='red.400' fontSize='sm' mt={1}>{meta.error}</Text>
                                    )}
                                </>
                            )}
                        </Field>
                    </FormControl>
                    <Button
                        type='submit'
                        variant="solid"
                        colorScheme='yellow'>
                        Отправить заказ
                    </Button>
                </VStack>
            </Form>
        </Formik>


    );
};