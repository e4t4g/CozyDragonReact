import React from 'react'
import * as pages from '../pages/index'

export interface IRoute {
    path: string
    component: React.ComponentType
}

export enum RouteNames {
    HOME = '/',
    FAVOURITES = '/favourites',
    CART = '/cart',
}

export const routes: IRoute[] = [
    { path: RouteNames.HOME, component: pages.Home },
    { path: RouteNames.FAVOURITES, component: pages.Favourites },
    { path: RouteNames.CART, component: pages.Cart },
]