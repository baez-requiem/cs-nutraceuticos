import { useEffect } from 'react'
import { useFormik } from "formik"
import { MediaType } from "src/services/api/medias/medias.types"
import { useMutation } from 'react-query'
import { mediasApi } from 'src/services/api'
import { toast } from 'react-toastify'

const initialValues = {
  name: '',
  description: '',
  notes: '',
  active: false
}

const useModalMedia = (
  show: boolean,
  onClose: (arg0?: boolean) => void,
  data?: MediaType
) => {
  const mutation = useMutation(async (values: typeof initialValues) => {
    const idMedia = data?.id

    toast.loading(`${idMedia ? 'Atualizando' : 'Inserindo'} dados...`)

    const ok = idMedia
      ? await mediasApi.updateMedia({ ...values, id: idMedia })
      : await mediasApi.createMedia(values)

    toast.dismiss()

    if (!ok) {
      toast.error(`Houve um erro ao ${idMedia ? 'atualizar' : 'cadastrar'} a mídia.`)
    } else {
      toast.success(`Mídia ${idMedia ? 'atualizado' : 'cadastrado'} com sucesso!`)
      onClose(true)
    }
  })
  
  const formik = useFormik({
    initialValues,
    onSubmit(values) {
      mutation.mutateAsync(values)
    },
  })

  useEffect(() => {
    data?.id
      ? formik.setValues({
        name: data.name,
        description: data.description || '',
        notes: data.notes || '',
        active: data.active
      })
      : formik.resetForm()
  }, [show])

  return {
    formik
  }
}

export { useModalMedia }