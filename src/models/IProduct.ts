import {ICategory} from "./ICategory";

export type IProduct = {
    id: number,
    title: string,
    price: string,
    category: ICategory,
    description: string,
    image: string
}