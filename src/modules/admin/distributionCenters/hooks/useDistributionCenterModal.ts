import { ChangeEvent, useEffect } from 'react'
import { useFormik } from "formik"
import { useQuery } from "react-query"
import { productsApi } from "src/services/api"
import { initialDataFormDistributionCenterModal } from "../constants"

const useDistributionCenterModal = () => {
  const { data: products } = useQuery(
    'products',
    productsApi.getAllProducts,
    { initialData: [], keepPreviousData: true, refetchOnWindowFocus: false }
  )

  const formik = useFormik({
    initialValues: initialDataFormDistributionCenterModal,
    onSubmit: (values) => { console.log(values) }
  })

  const handleSwitchChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { checked, name, value } = evt.target

    formik.setFieldValue(name, checked)
  }

  useEffect(() => {
    products.length && formik.setFieldValue('supply_quantity_notice', products.map(p => ({
      id_product: p.id,
      name: p.name,
      quantity: 0
    })))

  }, [products])

  return {
    products,
    handleSwitchChange,
    formik
  }
}

export { useDistributionCenterModal }