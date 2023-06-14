export type SalesTeamType = {
  id: string
  name: string
  notes: string | null
  created_at: string
  updated_at: string | null
}

export type CreateSaleTeamBody = {
  name: string
  notes: string | null
}

export type UpdateSaleTeamBody = {
  id: string
} & CreateSaleTeamBody