import { useFormik } from "formik"
import { initialDataFormNewSale } from "../constants"
import { consultCep } from "src/services/viacep"
import { useQuery } from "react-query"
import { mediasApi, salesApi } from "src/services/api"

const useModalNewSale = () => {

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
    selectMediasOpt
  }
}

export { useModalNewSale }