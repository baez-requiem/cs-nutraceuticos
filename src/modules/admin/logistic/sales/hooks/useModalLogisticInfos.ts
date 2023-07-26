import { useFormik } from "formik"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { logisticApi } from "src/services/api"
import { initialDataFormLogisticInfos } from "../constants"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { floatToReal, realToFloat } from "src/utils/number.utils"
import { formatDateValue } from "src/utils/date.utils"
import { CreateNewLogisticInfoBodyType, Sale } from "src/services/api/logistic/logistic.types"

interface useModalLogisticInfosProps {
  show: boolean
  onClose: () => void
  data: Sale
}

const useModalLogisticInfos = ({ show, onClose, data }: useModalLogisticInfosProps) => {

  const {
    deliveryTypes,
    motoboys,
    saleStatus
  } = useQueryData()

  const queryClient = useQueryClient()

  const createNewLogisticInfoMutation = useMutation(async (values: CreateNewLogisticInfoBodyType) => {
    const toastId = toast.loading(`Inserindo dados...`)

    const response = await logisticApi.createNewLogisticInfo(values)

    toast.dismiss(toastId)

    response
      ? toast.success(`Sucesso!`)
      : toast.error(`Houve um erro ao cadastrar dados.`)

    queryClient.refetchQueries({ queryKey: ['logistic/sales'] })

    onClose()
  })

  const formik = useFormik({
    initialValues: initialDataFormLogisticInfos,
    onSubmit: async values => {
      createNewLogisticInfoMutation.mutateAsync({
        ...values,
        id_sale: data.id,
        delivery_value: realToFloat(values.delivery_value)
      })
    }
  })

  useEffect(() => {
    if (show) {
      formik.setValues({
        delivery_date: formatDateValue(data.logistic_infos[0].delivery_date as string),
        delivery_value: floatToReal(data.logistic_infos[0].delivery_value),
        id_delivery_type: data.logistic_infos[0].id_delivery_type,
        id_motoboy: data.logistic_infos[0].id_motoboy,
        id_sale_status: data.logistic_infos[0].id_sale_status,
        notes: data.logistic_infos[0].notes,
      })
    } else {
      formik.resetForm()
    }
  }, [show])

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