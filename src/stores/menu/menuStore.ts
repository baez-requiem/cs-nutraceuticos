import { create } from "zustand"

type SubMenuType = 'reports'

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
    const newSubMenuOpen = state.subMenuOpen

    return {
      ...state,
      subMenuOpen: state.subMenuOpen.includes(subMenu)
        ? newSubMenuOpen.filter(sbm => sbm != subMenu)
        : [...newSubMenuOpen, subMenu]
    }
  })
}))

export default menuStore