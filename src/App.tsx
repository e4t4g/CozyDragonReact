import * as React from "react"
import {
    ChakraProvider,
    theme,
} from "@chakra-ui/react"
import {CartProvider} from "./context/CartContext";
import {Layout} from "./components/Layout";
import AppRouter from "./router/AppRouter";

export const App = () => {
    return (
        <ChakraProvider theme={theme}>
            <CartProvider>
                <Layout>
                    <AppRouter/>
                </Layout>
            </CartProvider>
        </ChakraProvider>
    )
}
