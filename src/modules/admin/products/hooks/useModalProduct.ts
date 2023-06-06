import { useEffect } from 'react'
import { useFormik } from "formik"
import { ProductType } from "src/services/api/products/products.types"
import { useMutation } from 'react-query'
import { productsApi } from 'src/services/api'
import { toast } from 'react-toastify'

const initialValues = {
  name: '',
  description: '',
  notes: '',
  active: false
}

const useModalProduct = (
  onClose: (arg0?: boolean) => void,
  data?: ProductType
) => {
  const mutation = useMutation(async (values: typeof initialValues) => {
    const idProduct = data?.id

    toast.loading(`${idProduct ? 'Atualizando' : 'Inserindo'} dados...`)

    const product = idProduct
      ? await productsApi.updateProduct({ ...values, id: idProduct })
      : await productsApi.createProduct(values)

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
        active: data.active
      })
      : formik.resetForm()
  }, [data])

  return {
    formik
  }
}

export { useModalProduct }