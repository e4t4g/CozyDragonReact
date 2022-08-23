import {
    Box,
    Text,
    Stack,
    Image,
    Flex,
    Button,
    Link,
    HStack,
    IconButton
} from '@chakra-ui/react';
import {FC} from "react";
import {FaMinus, FaPlus} from 'react-icons/fa';
import {useCart} from "../context/CartContext";
import {formatCurrency} from "../utilities/formatCurrency";

export type IProduct = {
    id: number,
    title: string,
    price: string,
    category: string,
    description: string,
    image: string
}

interface ProductItemProps {
    product: IProduct
}

export const ProductItem: FC<ProductItemProps> = ({product}) => {
    const {id, image, price, title} = product;
    const {increaseCartQuantity, decreaseCartQuantity, getItemQuantity} = useCart();

    const quantity = getItemQuantity(id);

    return (
        <Link style={{textDecoration: 'none'}}>
            <Flex
                maxW='300px'
                overflow='hidden'
                bg='gray.100'
                cursor='pointer'
                zIndex={1}
                rounded='16px'
                flexDirection='column'
                transition={'all .3s ease'}
                _hover={{backgroundColor: 'gray.200'}}
            >
                <Box p={4} transition={'all .3s ease'}>
                    <Flex height='250px' width='100%' justifyContent='center'>
                        <Image
                            maxH='100%'
                            maxW='100%'
                            objectFit={'contain'}
                            src={image}
                        />
                    </Flex>
                </Box>
                <Stack px={2} height='130px' alignItems='start' justifyContent='center'>
                    <Text fontWeight={800} fontSize={'xl'}>
                        &nbsp;{formatCurrency(Number(price))}&nbsp;
                    </Text>
                    <Text textAlign='left' fontSize={'md'} fontWeight={500} noOfLines={3}>
                        {title}
                    </Text>
                </Stack>
                {quantity === 0 ? (
                    <Button backgroundColor='white'
                            boxShadow='md'
                            rounded='2xl'
                            m={3}
                            transition='all .3s ease'
                            _hover={{transform: 'scale(1.05)'}}
                            onClick={() => increaseCartQuantity(product)}
                    >
                        В корзину
                    </Button>
                ) : (
                    <HStack my={3} mx={3} px={4} borderRadius='1rem' backgroundColor='white' boxShadow='md'
                            cursor='default'>
                        <IconButton aria-label='Add item'
                                    icon={<FaMinus/>}
                                    backgroundColor='white'
                                    borderRadius='1rem'
                                    _focus={{boxShadow: 'none'}}
                                    onClick={() => decreaseCartQuantity(product)}
                        />
                        <Text textAlign={"center"} flex={1} fontSize={"large"} fontWeight='bold' px={2}>
                            {quantity}
                        </Text>
                        <IconButton aria-label='Add item'
                                    icon={<FaPlus/>}
                                    variant='ghost'
                                    borderRadius='1rem'
                                    _focus={{boxShadow: 'none'}}
                                    onClick={() => increaseCartQuantity(product)}
                        />
                    </HStack>
                )}
            </Flex>
        </Link>

    );
}