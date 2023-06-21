import { lazy } from "react";

import Loadable from "../components/Loadable";
import Home from "../pages/Home";
import Hello from "../pages/Hello";

const MainLayout = Loadable(lazy(() => import("../layouts/MainLayout")));

const MainRoutes = [
    {
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/hello",
                element: <Hello />
            }
        ]
    }
];

export default MainRoutes;
