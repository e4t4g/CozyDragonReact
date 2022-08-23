import React, {ReactNode, useContext, useState} from "react";
import {IProduct} from "../components/ProductItem";

type CartProviderProps = {
    children: ReactNode
}

type CartItem = {
    product: IProduct,
    quantity: number
}

type CartContextProps = {
    openCart: () => void
    closeCart: () => void
    isOpen: boolean
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (product: IProduct) => void
    decreaseCartQuantity: (product: IProduct) => void
    cartQuantity: number
    cartItems: CartItem[]
}

const CartContext = React.createContext({} as CartContextProps);

export const useCart = () => {
    return useContext(CartContext);
}

export const CartProvider = ({children}: CartProviderProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    const getItemQuantity = (id: number) => {
        return cartItems.find(item => item.product.id === id)?.quantity || 0;
    }

    const openCart = () => {
        setIsOpen(true);
    }
    const closeCart = () => {
        setIsOpen(false);
    }

    const increaseCartQuantity = (product: IProduct) => {
        setCartItems(currItems => {
            if (currItems.find(item => item.product.id === product.id) == null) {
                return [...currItems, {product, quantity: 1}]
            } else {
                return currItems.map(item => {
                    if (item.product.id === product.id) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item;
                    }
                })
            }
        })
    }

    const decreaseCartQuantity = (product: IProduct) => {
        setCartItems(currItems => {
            if (currItems.find(item => item.product.id === product.id)?.quantity === 1) {
                return currItems.filter(item => item.product.id !== product.id);
            } else {
                return currItems.map(item => {
                    if (item.product.id === product.id) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item;
                    }
                })
            }
        })
    }

    return (
        <CartContext.Provider
            value={{
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                cartQuantity,
                cartItems,
                openCart,
                closeCart,
                isOpen
            }}>
            {children}
        </CartContext.Provider>
    )
}
