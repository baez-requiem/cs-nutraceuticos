import { useEffect } from 'react'
import { useFormik } from "formik"
import { MediaType } from "src/services/api/medias/medias.types"
import { useMutation } from 'react-query'
import { mediasApi } from 'src/services/api'
import { toast } from 'react-toastify'
import { useRefetchQueries } from 'src/hooks'
import { initialValuesFormMedia } from '../constants'
import { parseMediaValues, validateMedia } from '../utils/validations'

const useModalMedia = (
  show: boolean,
  onClose: () => void,
  data?: MediaType
) => {

  const { refetchQueries } = useRefetchQueries()

  const mutation = useMutation(async (values: typeof initialValuesFormMedia) => {
    const idMedia = data?.id

    const toastId = toast.loading(`${idMedia ? 'Atualizando' : 'Inserindo'} dados...`)

    const ok = idMedia
      ? await mediasApi.updateMedia({ ...values, id: idMedia })
      : await mediasApi.createMedia(values)

    toast.dismiss(toastId)

    if (!ok) {
      toast.error(`Houve um erro ao ${idMedia ? 'atualizar' : 'cadastrar'} a mídia.`)
    } else {
      toast.success(`Mídia ${idMedia ? 'atualizada' : 'cadastrada'} com sucesso!`)
      refetchQueries(['medias'])
      onClose()
    }
  })

  const formik = useFormik({
    initialValues: initialValuesFormMedia,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    validate: values => validateMedia(values, data?.id),
    onSubmit: values => mutation.mutateAsync(values)
  })

  useEffect(() => {
    data?.id
      ? formik.setValues(parseMediaValues(data))
      : formik.resetForm()
  }, [show])

  return {
    formik
  }
}

export { useModalMedia }