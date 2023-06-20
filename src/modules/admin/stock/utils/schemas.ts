import { z } from 'zod'

export const newBatchSchema = z.object({
  shipping:     z.number({ required_error: 'Valor é obrigatório' }).min(0).default(0),
  notes:        z.string().optional(),
  products: z.object({
    id_product: z.string(),
    quantity: z.number({ required_error: 'Quantidade é obrigatório' }).min(1),
    unit_amount: z.number({ required_error: 'Valor é obrigatório' }).positive().gte(0.01)
  }).array()
})

export const newMisplacementSchema = z.object({
  notes:        z.string().optional(),
  products: z.object({
    id_product: z.string(),
    quantity: z.number({ required_error: 'Quantidade é obrigatório' }).min(1)
  }).array()
})