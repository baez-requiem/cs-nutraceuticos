import { useEffect } from "react"
import { useFormik } from "formik"
import { useMutation, useQuery } from "react-query"
import { distributionCentersApi } from "src/services/api"
import { makeSelectOpts } from "src/utils/form.utils"
import { initialDataFormLeaveModal } from "../constants"
import { toast } from "react-toastify"
import { CreateMovementType, DistributionCenterStockType } from "src/services/api/distributionCenters/distributionCenters.types"
import { useRefetchQueries } from "src/hooks"
import { parseLeaveFormSubmit } from "../utils/mappers"

interface UseLeaveModalProps {
  show: boolean
  onClose: () => void
  data?: DistributionCenterStockType
}

const useLeaveModal = ({ show, onClose, data }: UseLeaveModalProps) => {

  const { data: distributionCenters } = useQuery(
    'distribution-centers',
    distributionCentersApi.getAll,
    { initialData: [], keepPreviousData: true, refetchOnWindowFocus: false }
  )

  const { refetchQueries } = useRefetchQueries()

  const movementMutation = useMutation(async (body: CreateMovementType) => {
    const toastId = toast.loading(`Inserindo dados...`)

    const ok = await distributionCentersApi.newMovement(body)

    toast.dismiss(toastId)

    ok
      ? toast.success(`Extravio registrado com sucesso!`)
      : toast.error(`Houve um erro ao registrar os dados.`)

    ok && refetchQueries(['distribution-centers/stock'])

    onClose()
  })

  const formik = useFormik({
    initialValues: initialDataFormLeaveModal,
    onSubmit: values => movementMutation.mutateAsync(parseLeaveFormSubmit(values))
  })

  const distributionCentersOpts = makeSelectOpts(distributionCenters, 'name', 'id', 'Selecione...')

  const productsOpts = () => {
    if (!data) return []

    const opts = data.stock.filter(s => s.quantity > 0 && !formik.values.products.find(fp => fp.id_product === s.id))

    return makeSelectOpts(opts, 'name', 'id', 'Selecione...')
  }

  const addProduct = () => {
    if (!data) return;

    const products = data.stock.filter(s => s.quantity > 0)

    const product = products.find(p => p.id === formik.values.product)
    const inForm = formik.values.products.find(fp => fp.id_product === formik.values.product)

    if (!product || inForm) return

    const newProducts = [
      ...formik.values.products,
      { id_product: product.id, quantity: '', name: product.name, max: product.quantity }
    ]

    formik.setFieldValue('products', newProducts)
    formik.setFieldValue('product', '')
  }

  const removeProduct = (id: string) => () => {
    const newProducts = formik.values.products.filter(fp => fp.id_product !== id)

    formik.setFieldValue('products', newProducts)
  }

  useEffect(() => {
    data
      ? formik.setFieldValue('distribution_center', data.id)
      : formik.resetForm()

  }, [show])

  return {
    distributionCentersOpts,
    productsOpts,
    addProduct,
    removeProduct,
    formik
  }
}

export { useLeaveModal }