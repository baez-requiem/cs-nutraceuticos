import { create } from "zustand"

type SubMenuType = 'logistic'

type State = {
  show: boolean
  open: () => void
  close: () => void
  subMenuOpen: SubMenuType[]
  toggleSubMenuOpen: (arg0: SubMenuType) => void
}

const menuStore = create<State>(set => ({
  show: false,
  open: () => set(() => ({ show: true })),
  close: () => set(() => ({ show: false })),
  subMenuOpen: [],
  toggleSubMenuOpen: subMenu => set(state => {
    const inSubMenuOpen = state.subMenuOpen.includes(subMenu)
    
    const newSubMenuOpen = inSubMenuOpen
      ? state.subMenuOpen.filter(sbm => sbm != subMenu)
      : [...state.subMenuOpen, subMenu]

    return {
      ...state,
      subMenuOpen: newSubMenuOpen,
      show: true
    }
  })
}))

export default menuStore