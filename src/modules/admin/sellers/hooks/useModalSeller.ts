import { useFormik } from "formik"
import { initialDataFormSeller } from "../constants"
import { consultCep } from "src/services/viacep"

const useModalSeller = () => {

  const formik = useFormik({
    initialValues: initialDataFormSeller,
    onSubmit(values, formikHelpers) {
      console.log(values)
    },
  })

  const searchCEP = async () => {
    const cep = formik.values.cep || ''

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

export { useModalSeller }