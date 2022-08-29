import {Flex, FlexProps} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

interface NavItemProps extends FlexProps {
    children: string;
}

export const NavItem = ({children, ...rest}: NavItemProps) => {
    return (
        <Link to={`/${children}`} style={{textDecoration: 'none'}}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'gray.400',
                    color: 'white',
                }}
                {...rest}>
                {children}
            </Flex>
        </Link>
    );
};