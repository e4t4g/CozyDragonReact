import {
    Box,
    Text,
    Stack,
    Image,
    Flex
} from '@chakra-ui/react';
import {FC} from "react";
import {Link} from 'react-router-dom';
import {useCart} from "../context/CartContext";
import {IProduct} from '../models/IProduct';
import {formatCurrency} from "../utilities/formatCurrency";
import Counter from "./UI/Counter";
import {FavouriteSwitcher} from "./UI/FavouriteSwitcher";

interface ProductItemProps {
    product: IProduct
}

export const ProductItem: FC<ProductItemProps> = ({product}) => {
    const {id, image, price, title} = product;
    const {getItemQuantity} = useCart();
    const quantity = getItemQuantity(id);

    const isFav = false;

    return (
        <Flex
            maxW='300px'
            overflow='hidden'
            bg='gray.100'
            zIndex={1}
            rounded='2xl'
            flexDirection='column'
            transition={'all .3s ease'}
            _hover={{backgroundColor: 'gray.200'}}
            justifyContent='space-between'
            position='relative'
        >
            <FavouriteSwitcher isFav={isFav}/>
            <Link to={`/${product.id}/${product.title}`}>
                <Box p={4}>
                    <Flex height='250px' width='100%' justifyContent='center'>
                        <Image
                            maxH='100%'
                            maxW='100%'
                            objectFit={'contain'}
                            src={image}
                        />
                    </Flex>
                </Box>
                <Stack px={4} height='130px' alignItems='start' justifyContent='center'>
                    <Text fontWeight={700} fontSize={'xl'}>
                        {formatCurrency(Number(price))}
                    </Text>
                    <Text textAlign='left' fontSize={'md'} fontWeight={500} noOfLines={3}>
                        {title}
                    </Text>
                </Stack>
            </Link>
            <Counter product={product} quantity={quantity}/>
        </Flex>
    );
}