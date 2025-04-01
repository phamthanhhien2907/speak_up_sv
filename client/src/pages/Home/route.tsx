import { lazy } from "react";
import { RouteObject } from "react-router-dom";
const HomePage = lazy(() => import("./index"));
const homeRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
];
export default homeRoutes;
