import { IRoute } from '../models/IRoute'
import * as pages from '../pages/index'

export enum RouteNames {
    HOME = '/',
    PRODUCT = '/:productId/:productTitle',
    FAVOURITES = '/favourites',
    CART = '/cart',
}

export const routes: IRoute[] = [
    { path: RouteNames.HOME, component: pages.Home },
    { path: RouteNames.PRODUCT, component: pages.Product },
    { path: RouteNames.FAVOURITES, component: pages.Favourites },
    { path: RouteNames.CART, component: pages.Cart },
]