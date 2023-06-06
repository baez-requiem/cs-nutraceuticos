export type MediaType = {
  id: number
  name: string
  description: string | null
  notes: string | null
  active: boolean
  created_at: string
  updated_at: string | null
}

export type GetAllMediasResponse = MediaType[]

export type CreateMediaBody = {
  name: string
  description: string | null
  notes: string | null
  active: boolean
}

export type UpdateMediaBody = {
  id: number
} & CreateMediaBody