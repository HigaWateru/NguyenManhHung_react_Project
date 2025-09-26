import LazyLoad from "@/components/LazyLoad";
import React from "react";
import { createBrowserRouter } from "react-router-dom";

const Login = React.lazy(() => import("@/pages/login"));
const Register = React.lazy(() => import("@/pages/register"));

const routers = createBrowserRouter([
  {
    path: "/login",
    element: <LazyLoad children={<Login />} />,
  },
  {
    path: "/register",
    element: <LazyLoad children={<Register />} />,
  },
]);

export default routers;
