import { lazy } from "react"

import { createBrowserRouter } from "react-router-dom"
import { Layout } from "src/components/template"
import Login from "src/pages/login/Login"
import lazyLoad from "./lazyLoad"

export const router = createBrowserRouter([
  { path: '*', element: <Login /> },
  { path: '/login', element: <Login /> },
  {
    path: '/admin',
    element: <Layout />,
    children: [
      {
        path: "/admin/dashboard",
        element: lazyLoad(lazy(() => import('src/modules/admin/dashboard/Dashboard')))
      },
      {
        path: "/admin/products",
        element: lazyLoad(lazy(() => import('src/modules/admin/products/Products')))
      },
      {
        path: "/admin/medias",
        element: lazyLoad(lazy(() => import('src/modules/admin/medias/Medias')))
      },
      {
        path: "/admin/sellers",
        element: lazyLoad(lazy(() => import('src/modules/admin/sellers/Sellers')))
      },
      {
        path: "/admin/stock",
        element: lazyLoad(lazy(() => import('src/modules/admin/stock/Stock')))
      },
      {
        path: "/admin/sales-team",
        element: lazyLoad(lazy(() => import('src/modules/admin/salesTeam/SalesTeam')))
      },
    ]
  },
  
])