import { BsBarChart, BsBox } from 'react-icons/bs'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { TbReportAnalytics } from 'react-icons/tb'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { MdStayPrimaryPortrait } from 'react-icons/md'

export const menuItems = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    Icon: BsBarChart
  },
  {
    label: 'Produtos',
    to: '/products',
    Icon: AiOutlineShoppingCart
  },
  {
    label: 'Vendedores',
    to: '/sellers',
    Icon: HiOutlineUserGroup
  },
  {
    label: 'Estoque',
    to: '/',
    Icon: BsBox
  },
  {
    label: 'Mídias',
    to: '/',
    Icon: MdStayPrimaryPortrait
  },
  {
    label: 'Relatórios',
    to: '/',
    Icon: TbReportAnalytics
  },
]