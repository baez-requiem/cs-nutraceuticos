import { BsBarChart, BsBox } from 'react-icons/bs'
import { HiOutlineUserGroup, HiOutlineUsers } from 'react-icons/hi2'
import { TbReportAnalytics } from 'react-icons/tb'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { MdStayPrimaryPortrait } from 'react-icons/md'
import { FaTruckLoading } from 'react-icons/fa'

export const menuItems = [
  {
    label: 'Dashboard',
    to: '/admin/dashboard',
    Icon: BsBarChart({ size: 22 })
  },
  {
    label: 'Produtos',
    to: '/admin/products',
    Icon: AiOutlineShoppingCart({ size: 22 })
  },
  {
    label: 'Mídias',
    to: '/admin/medias',
    Icon: MdStayPrimaryPortrait({ size: 22 })
  },
  {
    label: 'Usuários',
    to: '/admin/users',
    Icon: HiOutlineUsers({ size: 22 })
  },
  {
    label: 'Equipe de vendas',
    to: '/admin/sales-team',
    Icon: HiOutlineUserGroup({ size: 22 })
  },
  {
    label: 'Centros de distribuição',
    to: '/admin/distribution-centers',
    Icon: BsBox({ size: 22 })
  },
  {
    label: 'Logística',
    Icon: FaTruckLoading({ size: 22 }),
    children: [
      { label: 'Vendas', to: '/admin/logistic/sales', },
      { label: 'Motoboys', to: '/admin/logistic/motoboys', },
      { label: 'Fechamentos', to: '/admin/logistic/sale-closing', }
    ]
  },
  // {
  //   label: 'Relatórios',
  //   to: '/',
  //   Icon: TbReportAnalytics
  // },
]