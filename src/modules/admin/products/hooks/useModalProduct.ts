import { useEffect } from 'react'
import { useFormik } from "formik"
import { ProductType } from "src/services/api/products/products.types"
import { useMutation } from 'react-query'
import { productsApi } from 'src/services/api'
import { toast } from 'react-toastify'
import { formatReal, realToFloat } from 'src/utils/number.utils'

const initialValues = {
  description: '',
  active: false,
  amount: '',
  notes: '',
  name: '',
}

const useModalProduct = (
  show: boolean,
  onClose: (arg0?: boolean) => void,
  data?: ProductType
) => {
  const mutation = useMutation(async (values: typeof initialValues) => {
    const idProduct = data?.id

    toast.loading(`${idProduct ? 'Atualizando' : 'Inserindo'} dados...`)

    const product = idProduct
      ? await productsApi.updateProduct({ ...values, amount: realToFloat(values.amount), id: idProduct })
      : await productsApi.createProduct({...values, amount: realToFloat(values.amount) })

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
      mutation.mutateAsync(values)
    },
  })

  useEffect(() => {
    data?.id
      ? formik.setValues({
        name: data.name,
        description: data.description || '',
        notes: data.notes || '',
        active: data.active,
        amount: formatReal(data.amount) ,
      })
      : formik.resetForm()
  }, [show])

  return {
    formik
  }
}

export { useModalProduct }