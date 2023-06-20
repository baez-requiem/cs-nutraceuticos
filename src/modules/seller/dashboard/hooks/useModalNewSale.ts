import { useState } from "react"
import { useFormik } from "formik"
import { initialDataFormNewSale } from "../constants"
import { consultCep } from "src/services/viacep"
import { useQuery } from "react-query"
import { mediasApi, productsApi, salesApi } from "src/services/api"
import { ProductType } from "src/services/api/products/products.types"

type NewSaleProductsState = {
  quantity_sales?: number
  quantity?: number
} & ProductType

const useModalNewSale = () => {
  const [newSaleProducts, setNewSaleProducts] = useState<NewSaleProductsState[]>([])
  
  const {
    medias,
    paymentTypes,
    products
  } = useQueryData()

  const formik = useFormik({
    initialValues: initialDataFormNewSale,
    onSubmit(values, formikHelpers) {
      console.log(values)
    },
  })

  const searchCEP = async () => {
    const cep = formik.values.cep || ''

    if (cep.length != 8) { return }

    const data = await consultCep(cep)
  
    data?.uf && formik.setValues({
      ...formik.values,
      state: data.uf,
      city: data.localidade,
      neighborhood: data.bairro,
      address: data.logradouro,
      complement: data.complemento,
    })
  }

  const selectProductsOpt = products
    .filter(p => !newSaleProducts.find(nsp => nsp.id === p.id))
    .map(p => ({ label: p.name, value: p.id }))

  const selectPaymentTypesOpt = paymentTypes.map(pt => ({
    label: pt.name,
    value: pt.id
  }))
  
  const selectMediasOpt = medias.map(pt => ({
    label: pt.name,
    value: pt.id
  }))

  return {
    formik,
    searchCEP,
    paymentTypes,
    selectPaymentTypesOpt,
    selectMediasOpt,
    selectProductsOpt
  }
}

const useQueryData = () => {
  const { data: paymentTypes } = useQuery(
    'payment-types',
    salesApi.getPaymentTypes,
    {
      initialData: [],
      keepPreviousData: true,
      refetchOnWindowFocus: false 
    }
  )
 
  const { data: medias } = useQuery(
    'medias',
    mediasApi.getAllMedias,
    {
      initialData: [],
      keepPreviousData: true,
      refetchOnWindowFocus: false 
    }
  )

  const { data: products } = useQuery(
    'products',
    productsApi.getAllProducts,
    {
      initialData: [],
      keepPreviousData: true,
      refetchOnWindowFocus: false
    }
  )

  return {
    paymentTypes,
    medias,
    products
  }
}

export { useModalNewSale }