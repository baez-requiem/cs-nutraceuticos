import { useEffect } from 'react'
import { useFormik } from "formik"
import { ProductType } from "src/services/api/products/products.types"
import { useMutation } from 'react-query'
import { salesTeamApi } from 'src/services/api'
import { toast } from 'react-toastify'

const initialValues = {
  name: '',
  notes: '',
}

const useModalSaleTeam = (
  show: boolean,
  onClose: (arg0?: boolean) => void,
  data?: ProductType
) => {
  const saleTeamMutation = useMutation(async (values: typeof initialValues) => {
    const idSalesTeam = data?.id

    const toastId = toast.loading(`${idSalesTeam ? 'Atualizando' : 'Inserindo'} dados...`)

    const ok = idSalesTeam
      ? await salesTeamApi.updateSaleTeam({ ...values, id: idSalesTeam })
      : await salesTeamApi.createSaleTeam(values)

    toast.dismiss(toastId)

    if (!ok) {
      toast.error(`Houve um erro ao ${idSalesTeam ? 'atualizar' : 'cadastrar'} a equipe.`)
    } else {
      toast.success(`Equipe ${idSalesTeam ? 'atualizada' : 'cadastrada'} com sucesso!`)
      onClose(true)
    }
  })
  
  const formik = useFormik({
    initialValues,
    onSubmit: values => saleTeamMutation.mutateAsync(values),
  })

  useEffect(() => {
    data?.id
      ? formik.setValues({
        name: data.name,
        notes: data.notes || '',
      })
      : formik.resetForm()
  }, [show])

  return {
    formik
  }
}

export { useModalSaleTeam }