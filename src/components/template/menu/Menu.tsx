import React from "react"

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
} from "./menu.styles"

import { Divider } from "src/components/ui"

import { FiMenu } from 'react-icons/fi'
import { RxEnter } from 'react-icons/rx'

import { useMenu } from "./hook/useMenu"
import { menuItems } from "./menu.constans"

const Menu = () => {
  const {
    hasMenuHide,
    inRoute,
    navigateTo,
    toggleMenu
  } = useMenu()

  console.count('menu')

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
        {menuItems.map((item, i) => (
          <MenuItem
            onClick={navigateTo(item.to)}
            active={inRoute(item.to)}
            key={`${item.label}-${i}`}
          >
              <item.Icon size={22} />
              <span>{item.label}</span>
          </MenuItem>
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