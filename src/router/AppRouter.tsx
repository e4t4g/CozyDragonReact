import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {adminRoutes, routes} from "./index";

const AppRouter = () => {

    const isAdmin = true;

    return (
        <Routes>
            {isAdmin ? (
                adminRoutes.map(route =>
                    <Route
                        key={route.path}
                        path={route.path}
                        element={<route.component/>}
                    />
                )
            ) : (
                routes.map(route =>
                    <Route
                        key={route.path}
                        path={route.path}
                        element={<route.component/>}
                    />
                )
            )}
        </Routes>
    );
};

export default AppRouter;