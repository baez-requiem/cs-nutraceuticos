import { useEffect } from "react"
import { useFormik } from "formik"
import { useMutation, useQuery } from "react-query"
import { distributionCentersApi, productsApi } from "src/services/api"
import { makeSelectOpts } from "src/utils/form.utils"
import { initialDataFormEntryModal } from "../constants"
import { toast } from "react-toastify"
import { CreateMovementType } from "src/services/api/distributionCenters/distributionCenters.types"
import { useRefetchQueries } from "src/hooks"
import { parseEntryFormSubmit } from "../utils/mappers"

interface UseEntryModalProps {
  show: boolean
  onClose: () => void
}

const useEntryModal = ({ show, onClose }: UseEntryModalProps) => {

  const { data: distributionCenters } = useQuery(
    'distribution-centers',
    distributionCentersApi.getAll,
    { initialData: [], keepPreviousData: true, refetchOnWindowFocus: false }
  )

  const { data: products } = useQuery(
    ['products', { active: true }],
    () => productsApi.getAllProducts({ active: true }),
    { initialData: [], keepPreviousData: true, refetchOnWindowFocus: false }
  )

  const { refetchQueries } = useRefetchQueries()

  const movementMutation = useMutation(async (body: CreateMovementType) => {
    const toastId = toast.loading(`Inserindo dados...`)

    const ok = await distributionCentersApi.newMovement(body)

    toast.dismiss(toastId)

    ok
      ? toast.success(`Entrada registrada com sucesso!`)
      : toast.error(`Houve um erro ao registrar os dados.`)

    ok && refetchQueries(['distribution-centers/stock'])

    onClose()
  })

  const formik = useFormik({
    initialValues: initialDataFormEntryModal,
    onSubmit: values => movementMutation.mutateAsync(parseEntryFormSubmit(values))
  })

  const distributionCentersOpts = makeSelectOpts(distributionCenters, 'name', 'id', 'Selecione...')
  const productsOpts = makeSelectOpts(products.filter(p => !formik.values.products.find(fp => fp.id_product === p.id)), 'name', 'id', 'Selecione...')

  const addProduct = () => {
    const product = products.find(p => p.id === formik.values.product)
    const inForm = formik.values.products.find(fp => fp.id_product === formik.values.product)

    if (!product || inForm) return

    const newProducts = [
      ...formik.values.products,
      { id_product: product.id, quantity: 0, name: product.name }
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

  return {
    distributionCentersOpts,
    productsOpts,
    addProduct,
    removeProduct,
    formik
  }
}

export { useEntryModal }