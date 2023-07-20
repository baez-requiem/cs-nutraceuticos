import { useEffect } from 'react'
import { useFormik } from "formik"
import { useMutation } from 'react-query'
import { mediasApi } from 'src/services/api'
import { toast } from 'react-toastify'

const initialValues = {
  name: '',
  phone: '',
  notes: '',
  active: false
}

const useModalMotoboy = (
  show: boolean,
  onClose: () => void,
  data?: MotoboyType
) => {
  const mutation = useMutation(async (values: typeof initialValues) => {
    const idMedia = data?.id

    toast.loading(`${idMedia ? 'Atualizando' : 'Inserindo'} dados...`)

    const media = idMedia
      ? await mediasApi.updateMedia({ ...values, id: idMedia })
      : await mediasApi.createMedia(values)

    toast.dismiss()

    if (!media?.id) {
      toast.error(`Houve um erro ao ${idMedia ? 'atualizar' : 'cadastrar'} a mídia.`)
    } else {
      toast.success(`Mídia ${idMedia ? 'atualizado' : 'cadastrado'} com sucesso!`)
      onClose()
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
        notes: data.notes || '',
        phone: data.notes || '',
        active: data.active
      })
      : formik.resetForm()
  }, [show])

  return {
    formik
  }
}

export { useModalMotoboy }