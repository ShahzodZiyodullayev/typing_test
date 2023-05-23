import { lazy } from "react";

import Loadable from "../components/Loadable";
import Home from "../pages/Home";

const MainLayout = Loadable(lazy(() => import("../layouts/MainLayout")));

const MainRoutes = [
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
];

export default MainRoutes;
