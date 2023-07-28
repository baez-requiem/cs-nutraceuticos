import { useEffect } from 'react'
import { useFormik } from "formik"
import { ProductType } from "src/services/api/products/products.types"
import { useMutation } from 'react-query'
import { productsApi } from 'src/services/api'
import { toast } from 'react-toastify'
import { formatReal, realToFloat } from 'src/utils/number.utils'
import { initialValuesFormProduct } from '../constants'
import { parseProductSubmit, validateProduct } from '../utils/validations'

const useModalProduct = (
  show: boolean,
  onClose: (arg0?: boolean) => void,
  data?: ProductType
) => {
  const mutation = useMutation(async (values: typeof initialValuesFormProduct) => {
    const idProduct = data?.id

    const toastId = toast.loading(`${idProduct ? 'Atualizando' : 'Inserindo'} dados...`)

    const body = parseProductSubmit(values)

    const ok = idProduct
      ? await productsApi.updateProduct({ ...body, id: idProduct })
      : await productsApi.createProduct(body)

    toast.dismiss(toastId)

    if (!ok) {
      toast.error(`Houve um erro ao ${idProduct ? 'atualizar' : 'cadastrar'} o produto.`)
    } else {
      toast.success(`Produto ${idProduct ? 'atualizado' : 'cadastrado'} com sucesso!`)
      onClose(true)
    }
  })
  
  const formik = useFormik({
    initialValues: initialValuesFormProduct,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    validate: values => validateProduct(values, data?.id),
    onSubmit: values => mutation.mutateAsync(values)
  })

  useEffect(() => {
    data?.id
      ? formik.setValues({
        name: data.name,
        description: data.description || '',
        notes: data.notes || '',
        active: data.active,
        supply_quantity_notice: data.supply_quantity_notice?.toString() || '',
        amount: formatReal(data.amount) ,
      })
      : formik.resetForm()
  }, [show])

  return {
    formik
  }
}

export { useModalProduct }