import { useFormik } from "formik"
import { useQuery } from "react-query"
import { distributionCentersApi, productsApi } from "src/services/api"
import { makeSelectOpts } from "src/utils/form.utils"
import { initialDataFormEntryModal } from "../constants"

const useEntryModal = () => {

  const { data: distributionCenters } = useQuery(
    'distribution-centers',
    distributionCentersApi.getAll,
    { initialData: [], keepPreviousData: true, refetchOnWindowFocus: false }
  )

  const { data: products } = useQuery(
    'products',
    productsApi.getAllProducts,
    { initialData: [], keepPreviousData: true, refetchOnWindowFocus: false }
  )

  const distributionCentersOpts = makeSelectOpts(distributionCenters, 'name', 'id', 'Selecione...')
  const productsOpts = makeSelectOpts(products, 'name', 'id')

  const formik = useFormik({
    initialValues: initialDataFormEntryModal,
    onSubmit: (values) => { console.log(values) }
  })

  const addProduct = () => {

  }

  return {
    distributionCentersOpts,
    productsOpts,
    formik
  }
}

export { useEntryModal }