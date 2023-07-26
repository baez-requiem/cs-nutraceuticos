import { useEffect } from 'react'
import { useFormik } from "formik"
import { useMutation, useQueryClient } from 'react-query'
import { logisticApi } from 'src/services/api'
import { toast } from 'react-toastify'
import { MotoboyType } from 'src/services/api/logistic/logistic.types'

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

  const queryClient = useQueryClient()

  const mototobyMutation = useMutation(async (values: typeof initialValues) => {
    const idMotoboy = data?.id

    const toastId = toast.loading(`${idMotoboy ? 'Atualizando' : 'Inserindo'} dados...`)

    const ok = idMotoboy
      ? await logisticApi.updateMotoboy({ ...values, id: idMotoboy })
      : await logisticApi.createMotoboy(values)

    toast.dismiss(toastId)

    if (!ok) {
      toast.error(`Houve um erro ao ${idMotoboy ? 'atualizar' : 'cadastrar'} o motoboy.`)
    } else {
      toast.success(`Motoboy ${idMotoboy ? 'atualizado' : 'cadastrado'} com sucesso!`)
      
      queryClient.refetchQueries(['logistic/motoboys'])
      
      onClose()
    }
  })
  
  const formik = useFormik({
    initialValues,
    onSubmit(values) {
      mototobyMutation.mutateAsync(values)
    },
  })

  useEffect(() => {
    data?.id
      ? formik.setValues({
        name: data.name,
        notes: data.notes || '',
        phone: data.phone || '',
        active: data.active
      })
      : formik.resetForm()
  }, [show])

  return {
    formik
  }
}

export { useModalMotoboy }