import { z } from "zod"
import { initialValuesFormMedia } from "../constants"
import { toast } from "react-toastify"
import { MediaType } from "src/services/api/medias/medias.types"

const mediaSchema = z.object({
  name: z.string().nonempty("Nome não deve ser vazio."),
})

export const validateMedia = (values: typeof initialValuesFormMedia, id?: string): {} => {
  const errors = {}

  const result = mediaSchema.safeParse(values)

  if (!result.success && 'error' in result) {
    result.error.issues.forEach(err => {
      errors[err.path[0]] = err.message
      toast.error(err.message)
    })
  }

  return errors
}

export const parseMediaValues = (media: MediaType) => {
  const formatedMedia = {
    name: media.name,
    description: media.description || '',
    notes: media.notes || '',
    active: media.active
  }

  return formatedMedia
}