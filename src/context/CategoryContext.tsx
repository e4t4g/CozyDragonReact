import React, {ReactNode, useContext, useState} from "react";

type CategoryProviderProps = {
    children: ReactNode
}

type CategoryContextProps = {
    currentCategory: string,
    categories: string[],
    onChangeCurrentCategory: (value: string) => void
    onChangeCategories: (value: string[]) => void
}

const CategoryContext = React.createContext({} as CategoryContextProps);

export const useCategory = () =>  useContext(CategoryContext);

export const CategoryProvider = ({children}: CategoryProviderProps) => {
    const [currentCategory, setCurrentCategory] = useState('all');
    const [categories, setCategories] = useState<string[]>([]);


    const onChangeCurrentCategory = (value: string) => {
        setCurrentCategory(value);
    };
    const onChangeCategories = (value: string[]) => {
        setCategories(value);
    };

    return (
        <CategoryContext.Provider
            value={{
                currentCategory,
                categories,
                onChangeCurrentCategory,
                onChangeCategories
            }}>
            {children}
        </CategoryContext.Provider>
    )
}
