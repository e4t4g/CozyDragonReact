import React, {ReactNode, useContext, useState} from "react";

type CategoryProviderProps = {
    children: ReactNode
}

type CategoryContextProps = {
    currentCategory: string,
    onChangeCurrentCategory: (value: string) => void
}

const CategoryContext = React.createContext({} as CategoryContextProps);

export const useCategory = () =>  useContext(CategoryContext);

export const CategoryProvider = ({children}: CategoryProviderProps) => {
    const [currentCategory, setCurrentCategory] = useState('all');

    const onChangeCurrentCategory = (value: string) => {
        setCurrentCategory(value);
    }
    return (
        <CategoryContext.Provider
            value={{
                currentCategory,
                onChangeCurrentCategory
            }}>
            {children}
        </CategoryContext.Provider>
    )
}
