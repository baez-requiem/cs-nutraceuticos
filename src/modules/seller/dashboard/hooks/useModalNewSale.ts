import { useFormik } from "formik"
import { initialDataFormNewSale } from "../constants"
import { consultCep } from "src/services/viacep"

const useModalNewSale = () => {

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

  return {
    formik,
    searchCEP
  }
}

export { useModalNewSale }