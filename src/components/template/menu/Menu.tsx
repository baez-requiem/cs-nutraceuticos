import { FC, ReactNode } from 'react'

import {
  ExitItem,
  MenuButton,
  MenuContent,
  MenuItem,
  NavContainer,
  NavHeader,
  NavLogo,
  UserContent,
  StyledSpan,
  SubMenu,
  SubMenuItem,
} from "./menu.styles"

import { Divider } from "src/components/ui"

import { FiMenu } from 'react-icons/fi'
import { RxEnter } from 'react-icons/rx'

import { useMenu } from "./hook/useMenu"
import { BsDot } from 'react-icons/bs'

export interface MenuItemChildren {

}

export interface MenuItem {
  label: string
  to?: string
  Icon: ReactNode
  children?: { label: string, to: string }[]
}

export interface MenuProps {
  menuItems?: MenuItem[]
}

const Menu: FC<MenuProps> = ({
  menuItems = []
}) => {
  const {
    hasMenuHide,
    inRoute,
    navigateTo,
    toggleMenu,
    subMenuOpen,
    toggleSubMenuOpen
  } = useMenu()

  return (
    <NavContainer hasMenuHide={hasMenuHide}>
      <NavHeader>
        <NavLogo>
          <p>CentralSul</p>
          <p>Nutracêuticos</p>
        </NavLogo>
        <MenuButton onClick={toggleMenu}>
          <FiMenu size={20} color="#fff" />
        </MenuButton>
      </NavHeader>

      <UserContent hasMenuHide={hasMenuHide}>
        <Divider line my={0} />
        <span>teste@email.com.br</span>
        <Divider line my={0} />
      </UserContent>

      <MenuContent>
        {menuItems.map((item, i) => item.to ? (
          <MenuItem
            onClick={navigateTo(item.to)}
            active={inRoute(item.to)}
            key={`${item.label}-${i}`}
          >
            {item.Icon}
            <span>{item.label}</span>
          </MenuItem>
        ) : (
          <SubMenu
            key={`submenu-${item.label}`}
            active={subMenuOpen.includes('logistic') || item.children.some(ic => inRoute(ic.to))}
            hasMenuHide={hasMenuHide}
          >
            <div onClick={() => toggleSubMenuOpen('logistic')}>
              {item.Icon}
              <span>{item.label}</span>
            </div>
            <div>
              <ul>
                {item.children.map(ic => (
                  <SubMenuItem
                    onClick={navigateTo(ic.to)}
                    key={`${item.label}-${i}-${ic.label}`}
                    active={inRoute(ic.to)}
                  >
                    <BsDot size={20} />
                    <span>{ic.label}</span>
                  </SubMenuItem>
                ))}
              </ul>
            </div>
          </SubMenu>
        ))}
      </MenuContent>

      <ExitItem onClick={navigateTo('/login')}>
        <RxEnter size={20} color="#fff" transform="scale(-1)" />
        <StyledSpan>Sair</StyledSpan>
      </ExitItem>
    </NavContainer>
  )
}

export default Menu