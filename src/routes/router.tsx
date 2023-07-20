import { lazy } from "react"

import { createBrowserRouter } from "react-router-dom"
import { AdminLayout, SellerLayout } from "src/components/template"
import Login from "src/pages/login/Login"
import lazyLoad from "./lazyLoad"

export const router = createBrowserRouter([
  { path: '*', element: <Login /> },
  { path: '/login', element: <Login /> },
  {
    path: '/seller',
    element: <SellerLayout />,
    children: [
      {
        path: "/seller/dashboard",
        element: lazyLoad(lazy(() => import('src/modules/seller/dashboard/Dashboard')))
      },
      {
        path: "/seller/sales-history",
        element: lazyLoad(lazy(() => import('src/modules/seller/salesHistory/SalesHistory')))
      }
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
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
        path: "/admin/users",
        element: lazyLoad(lazy(() => import('src/modules/admin/users/Users')))
      },
      {
        path: "/admin/stock",
        element: lazyLoad(lazy(() => import('src/modules/admin/stock/Stock')))
      },
      {
        path: "/admin/sales-team",
        element: lazyLoad(lazy(() => import('src/modules/admin/salesTeam/SalesTeam')))
      },
      {
        path: "/admin/logistic/sales",
        element: lazyLoad(lazy(() => import('src/modules/admin/logistic/sales/Sales')))
      },
      {
        path: "/admin/logistic/motoboys",
        element: lazyLoad(lazy(() => import('src/modules/admin/logistic/motoboys/Motoboys')))
      },
      {
        path: "/admin/logistic/sale-closing",
        element: lazyLoad(lazy(() => import('src/modules/admin/logistic/saleClosing/SaleClosing')))
      },
    ]
  },
  
])