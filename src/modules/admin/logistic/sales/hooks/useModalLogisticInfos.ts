import { useFormik } from "formik"
import { useQuery } from "react-query"
import { logisticApi } from "src/services/api"
import { initialDataFormLogisticInfos } from "../constants"
import { useEffect } from "react"

interface useModalLogisticInfosProps {
  show: boolean
}

const useModalLogisticInfos = ({ show }: useModalLogisticInfosProps) => {

  const {
    deliveryTypes,
    motoboys,
    saleStatus
  } = useQueryData()

  const formik = useFormik({
    initialValues: initialDataFormLogisticInfos,
    onSubmit: values => {
      console.log(values)
    }
  })

  useEffect(() => {
    if (show) {

    } else {
      formik.resetForm()
    }
  }, [])

  return {
    saleStatus,
    deliveryTypes,
    motoboys,
    formik
  }
}

const useQueryData = () => {
  const { data: saleStatus } = useQuery(
    '/logistic/sale-status',
    logisticApi.getSaleStatus,
    { refetchOnWindowFocus: false, initialData: [] }
  )
  
  const { data: deliveryTypes } = useQuery(
    '/logistic/delivery-types',
    logisticApi.getDeliveryTypes,
    { refetchOnWindowFocus: false, initialData: [] }
  )

  const { data: motoboys } = useQuery(
    '/logistic/motoboys',
    logisticApi.getMotoboys,
    { refetchOnWindowFocus: false, initialData: [] }
  )

  return {
    saleStatus,
    deliveryTypes,
    motoboys
  }
}

export { useModalLogisticInfos }