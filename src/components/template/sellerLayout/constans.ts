import { BsBarChart, BsBox } from 'react-icons/bs'
import { HiOutlineUserGroup, HiOutlineUsers } from 'react-icons/hi2'
import { TbReportAnalytics } from 'react-icons/tb'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { MdStayPrimaryPortrait } from 'react-icons/md'

export const menuItems = [
  {
    label: 'Dashboard',
    to: '/seller/dashboard',
    Icon: BsBarChart({ size: 22 })
  },
  // {
  //   label: 'Produtos',
  //   to: '/admin/products',
  //   Icon: AiOutlineShoppingCart({ size: 22 })
  // },
  // {
  //   label: 'Estoque',
  //   to: '/admin/stock',
  //   Icon: BsBox({ size: 22 })
  // },
  // {
  //   label: 'Relatórios',
  //   to: '/',
  //   Icon: TbReportAnalytics
  // },
]