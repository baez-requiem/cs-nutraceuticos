import { lazy } from "react"

import { createBrowserRouter } from "react-router-dom"
import { Layout } from "src/components/template"
import Login from "src/pages/login/Login"
import lazyLoad from "./lazyLoad"

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        element: lazyLoad(lazy(() => import('src/pages/dashboard/Dashboard')))
      },
      {
        path: "products",
        element: lazyLoad(lazy(() => import('src/pages/products/Products')))
      },
      {
        path: "medias",
        element: lazyLoad(lazy(() => import('src/pages/medias/Medias')))
      },
      {
        path: "sellers",
        element: lazyLoad(lazy(() => import('src/pages/sellers/Sellers')))
      },
      {
        path: "stock",
        element: lazyLoad(lazy(() => import('src/pages/stock/Stock')))
      },
      {
        path: "sales-team",
        element: lazyLoad(lazy(() => import('src/pages/salesTeam/SalesTeam')))
      },
    ]
  },
  { path: '/*', element: <Login /> }
])