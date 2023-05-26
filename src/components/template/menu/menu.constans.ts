import { BsBarChart, BsBox } from 'react-icons/bs'
import { HiOutlineUserGroup, HiOutlineUsers } from 'react-icons/hi2'
import { TbReportAnalytics } from 'react-icons/tb'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { MdStayPrimaryPortrait } from 'react-icons/md'

export const menuItems = [
  {
    label: 'Dashboard',
    to: '/admin/dashboard',
    Icon: BsBarChart
  },
  {
    label: 'Produtos',
    to: '/admin/products',
    Icon: AiOutlineShoppingCart
  },
  {
    label: 'Mídias',
    to: '/admin/medias',
    Icon: MdStayPrimaryPortrait
  },
  {
    label: 'Vendedores',
    to: '/admin/sellers',
    Icon: HiOutlineUsers
  },
  {
    label: 'Equipe de vendas',
    to: '/admin/sales-team',
    Icon: HiOutlineUserGroup
  },
  {
    label: 'Estoque',
    to: '/admin/stock',
    Icon: BsBox
  },
  // {
  //   label: 'Relatórios',
  //   to: '/',
  //   Icon: TbReportAnalytics
  // },
]