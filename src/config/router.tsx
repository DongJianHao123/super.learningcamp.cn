import React, { lazy } from "react";
import ErrorPage from "@components/ErrorPage";
import App from '../App'
import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import ClientEdit from "@pages/Client/ClientEdit";
import Login from "../layout/components/Login";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const FormPage = lazy(() => import("../pages/FormPage"));
const Client = lazy(() => import('../pages/Client'))
const AccountCenter = lazy(() => import("../pages/AccountPage/AccountCenter"));
const AccountSettings = lazy(
  () => import("../pages/AccountPage/AccountSettings")
);
const DetailPage = lazy(() => import("../pages/DetailPage"));

const GetRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <App />,
      children: [
        {
          errorElement: <ErrorPage />,
          children: [
            {
              index: true,
              element: <Dashboard />,
            },
            {
              path: "client",
              children: [
                {
                  path: '/client/list',
                  element: <Client />,
                },
                {
                  path: '/client/edit/:id',
                  element: <ClientEdit />
                },
              ]
            },
            {
              path: "camp",
              element: <FormPage />,
            },
            {
              path: "student",
              element: <DetailPage />,
            },
            {
              path: "account",
              children: [
                {
                  path: "/account/center",
                  element: <AccountCenter />,
                },
                {
                  path: "/account/settings",
                  element: <AccountSettings />,
                },
              ],
            },
            {
              path: "*",
              element: <Navigate to="/" replace={true} />,
            },
          ],
        },
      ]
    },
    {
      path:'/login',
      element:<Login/>
  }

  ])
  return routes
}
const InitRoutes = () => {
  return <BrowserRouter>
    <GetRoutes />
  </BrowserRouter>
}

export default InitRoutes;
