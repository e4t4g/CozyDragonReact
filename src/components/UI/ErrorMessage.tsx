import React from 'react';
import {Box, Text} from "@chakra-ui/react";

interface ErrorMessageProps {
    message: string
}

const ErrorMessage = ({message}: ErrorMessageProps) => {
    return (
        <Box
            w='fit-content'
            mt={12}
            px={6}
            py={4}
            border='2px solid'
            borderColor='yellow.600'
            borderRadius='2xl'
            backgroundColor='yellow.100'
        >
            <Text fontSize='large'><Text as='span' fontWeight='bold'>Error:</Text> {message}</Text>
        </Box>
    );
};

export default ErrorMessage;