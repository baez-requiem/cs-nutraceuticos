import { lazy } from "react"

import { createBrowserRouter } from "react-router-dom"
import { Layout } from "src/components/template"
import Login from "src/pages/login/Login"
import lazyLoad from "./lazyLoad"

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    path: '/admin/',
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        element: lazyLoad(lazy(() => import('src/modules/admin/dashboard/Dashboard')))
      },
      {
        path: "products",
        element: lazyLoad(lazy(() => import('src/modules/admin/products/Products')))
      },
      {
        path: "medias",
        element: lazyLoad(lazy(() => import('src/modules/admin/medias/Medias')))
      },
      {
        path: "sellers",
        element: lazyLoad(lazy(() => import('src/modules/admin/sellers/Sellers')))
      },
      {
        path: "stock",
        element: lazyLoad(lazy(() => import('src/modules/admin/stock/Stock')))
      },
      {
        path: "sales-team",
        element: lazyLoad(lazy(() => import('src/modules/admin/salesTeam/SalesTeam')))
      },
    ]
  },
  { path: '*', element: <Login /> }
])