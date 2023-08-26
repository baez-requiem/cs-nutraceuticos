import { useEffect } from "react"
import { useFormik } from "formik"
import { useMutation, useQuery } from "react-query"
import { distributionCentersApi, productsApi } from "src/services/api"
import { makeSelectOpts } from "src/utils/form.utils"
import { initialDataFormTransferModal } from "../constants"
import { toast } from "react-toastify"
import { CreateMovementType, DistributionCenterStockType } from "src/services/api/distributionCenters/distributionCenters.types"
import { useRefetchQueries } from "src/hooks"
import { parseTransferFormSubmit } from "../utils/mappers"

interface UseTransferModalProps {
  show: boolean
  onClose: () => void
  data: DistributionCenterStockType[]
}

const useTransferModal = ({ show, onClose, data }: UseTransferModalProps) => {

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
      ? toast.success(`Transferência registrada com sucesso!`)
      : toast.error(`Houve um erro ao registrar os dados.`)

    ok && refetchQueries(['distribution-centers/stock'])

    onClose()
  })

  const formik = useFormik({
    initialValues: initialDataFormTransferModal,
    onSubmit: values => movementMutation.mutateAsync(parseTransferFormSubmit(values))
  })

  const distributionCentersOpts = makeSelectOpts(distributionCenters, 'name', 'id', 'Selecione...')

  const addProduct = () => {

    const { id_distribution_center_from, product } = formik.values

    if (!id_distribution_center_from || !product) return
    
    const stockProduct = data.find(dc => dc.id === id_distribution_center_from)?.stock.find(s => s.id === product)
    
    if (!stockProduct) return
    
    const inForm = formik.values.products.find(fp => fp.id_product === formik.values.product)

    if (inForm) return

    const newProducts = [
      ...formik.values.products,
      { id_product: stockProduct.id, quantity: 0, name: stockProduct.name, max: stockProduct.quantity }
    ]

    formik.setFieldValue('products', newProducts)
    formik.setFieldValue('product', '')
  }

  const removeProduct = (id: string) => () => {
    const newProducts = formik.values.products.filter(fp => fp.id_product !== id)

    formik.setFieldValue('products', newProducts)
  }

  useEffect(() => {
    !show && formik.resetForm()

  }, [show])

  const productsOpts = () => {
    const hasDCfrom = formik.values.id_distribution_center_from

    if (!hasDCfrom) return []
    
    const DCExists = data.find(dc => dc.id === hasDCfrom)
    
    if (!DCExists) return []

    const opts = DCExists.stock.filter(s => s.quantity > 0 && !formik.values.products.find(fp => fp.id_product === s.id))

    return makeSelectOpts(opts, 'name', 'id', 'Selecione...')
  }

  return {
    distributionCentersOpts,
    addProduct,
    removeProduct,
    formik,
    productsOpts
  }
}

export { useTransferModal }