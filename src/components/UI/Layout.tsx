import {Box} from '@chakra-ui/react';
import React, {FC, PropsWithChildren} from 'react';
import Footer from '../Footer';
import {Header} from '../Header';

export const Layout: FC<PropsWithChildren<{}>> = ({children}) => {
    return (
        <Box>
            <Header/>
            <main style={{minHeight: 'calc(100vh - 80px - 61px)'}}>
                {children}
            </main>
            <Footer/>
        </Box>
    )
}