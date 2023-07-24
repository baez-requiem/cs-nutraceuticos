import { RoleType } from "../roles/roles.types"
import { SalesTeamType } from "../salesTeam/salesTeam.types"

export type UserType = {
  id: string
  name: string
  username: string
  phone: string | null
  active: boolean
  rg: string | null
  cpf: string | null
  notes: string | null
  initial_date: string | null
  cep: string | null
  state: string | null
  city: string | null
  neighborhood: string | null
  address: string | null
  complement: string | null
  roleId: string | null
  salesTeamId: string | null
  created_at: string 
  updated_at: string | null
  role?: RoleType
  salesTeam?: SalesTeamType
}

export type CreateUserBody = {
  name: string
  username: string
  phone: string | null
  active: boolean
  rg: string | null
  cpf: string | null
  notes: string | null
  initial_date: string | null
  cep: string | null
  state: string | null
  city: string | null
  neighborhood: string | null
  address: string | null
  complement: string | null
  roleId: string | null
}

export type UpdateUserBody = {
  id: string
} & CreateUserBody

export type GetUserParams = {
  active?: boolean
  user_role?: string 
}