import { BsBarChart, BsBox } from 'react-icons/bs'
import { HiOutlineUserGroup, HiOutlineUsers } from 'react-icons/hi2'
import { TbReportAnalytics } from 'react-icons/tb'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { MdOutlineHistory } from 'react-icons/md'

export const menuItems = [
  {
    label: 'Dashboard',
    to: '/seller/dashboard',
    Icon: BsBarChart({ size: 22 })
  },
  {
    label: 'Histórico de vendas',
    to: '/seller/sales-history',
    Icon: MdOutlineHistory({ size: 22 })
  },
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