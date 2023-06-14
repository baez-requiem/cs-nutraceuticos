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
    const idProduct = data?.id

    toast.loading(`${idProduct ? 'Atualizando' : 'Inserindo'} dados...`)

    const product = idProduct
      ? await salesTeamApi.updateSaleTeam({ ...values, id: idProduct })
      : await salesTeamApi.createSaleTeam(values)

    toast.dismiss()

    if (!product?.id) {
      toast.error(`Houve um erro ao ${idProduct ? 'atualizar' : 'cadastrar'} o produto.`)
    } else {
      toast.success(`Produto ${idProduct ? 'atualizado' : 'cadastrado'} com sucesso!`)
      onClose(true)
    }
  })
  
  const formik = useFormik({
    initialValues,
    onSubmit(values) {
      saleTeamMutation.mutateAsync(values)
    },
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