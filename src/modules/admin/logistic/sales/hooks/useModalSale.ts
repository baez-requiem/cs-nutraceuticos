import { ChangeEvent, useState, useEffect } from "react"
import { useFormik } from "formik"
import { initialDataFormNewSale } from "../constants"
import { consultCep } from "src/services/viacep"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { mediasApi, salesApi, stockApi } from "src/services/api"
import { floatToReal, formatCEP, formatCPF, formatPhone } from "src/utils/number.utils"
import { toast } from "react-toastify"
import { SaleBodyType } from "src/services/api/sales/sales.types"
import { Sale } from "src/services/api/logistic/logistic.types"
import { parseSaleSubmit, validateSale } from "../utils/validationSale"

const useModalSale = (
  show: boolean,
  data: Sale | null,
  onClose: () => void
) => {
  const [selectValue, setSelectValue] = useState<string>('')
  
  const queryClient = useQueryClient()
  
  const {
    medias,
    paymentTypes,
    stockProducts
  } = useQueryData()

  const createNewSaleMutation = useMutation(async (values: SaleBodyType) => {
    const toastId = toast.loading(`Inserindo dados...`)

    const ok = await salesApi.updateSale(values)

    toast.dismiss(toastId)

    ok
      ? toast.success(`Venda efetuada com sucesso!`)
      : toast.error(`Houve um erro ao efetuar a venda.`)

    onClose()
  }, {
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: 'logistic/sales' })
    }
  })

  const formik = useFormik({
    initialValues: initialDataFormNewSale,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    validate: (values) => validateSale(values),
    onSubmit: values => createNewSaleMutation.mutateAsync(parseSaleSubmit(values, data.id))
  })

  const handleSelect = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => setSelectValue(value)

  const addProduct = () => {
    const hasProduct = stockProducts.find(p => p.id === selectValue)

    if (!hasProduct) { return }

    const formProducts = [
      ...formik.values.products,
      {
        id_product: hasProduct.id,
        name: hasProduct.name,
        quantity: 1,
        sales_quantity: 1,
        amount: hasProduct.amount
      }
    ]

    formik.setFieldValue('products', formProducts)

    const slcValue = stockProducts.filter(p => !formProducts.find(fp => fp.id_product === p.id))[0]?.id || ''

    setSelectValue(slcValue.toString())
  }

  const searchCEP = async () => {
    const cep = formik.values.cep || ''

    if (cep.length != 9) { return }

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

  useEffect(() => {
    if (!show) {
      formik.resetForm()
      return
    } else {
      formik.setValues({
        address: data.address,
        paid: +data.paid,
        card_installments: data.card_installments+'',
        cep: formatCEP(data.cep),
        city: data.city,
        complement: data.complement,
        cpf: formatCPF(data.cpf),
        discounts: floatToReal(data.discounts),
        email: data.email,
        media_id: data.media_id,
        name: data.name,
        neighborhood: data.neighborhood,
        notes: data.notes,
        payment_type_id: data.payment_type_id,
        phone: formatPhone(data.phone),
        rg: data.rg,
        state: data.state,
        products: data.sale_products.map(sp => ({ 
          id_product: sp.id_product,
          quantity: sp.quantity,
          name: sp.product.name,
          amount: sp.product.amount,
          sales_quantity: sp.sales_quantity
        }))
      })
    }

    const slcValue = stockProducts.filter(p => !formik.values.products.find(fp => fp.id_product === p.id))[0]?.id || ''

    setSelectValue(slcValue.toString())

    // !!medias.length && formik.setFieldValue('media_id', medias[0].id)
    // !!paymentTypes.length && formik.setFieldValue('payment_type_id', paymentTypes[0].id)
  }, [stockProducts, medias, paymentTypes, show])

  const selectProductsOpt = stockProducts
    .filter(p => !formik.values.products.find(nsp => nsp.id_product === p.id))
    .map(p => ({ label: p.name, value: p.id }))

  const selectPaymentTypesOpt = paymentTypes.map(pt => ({
    label: pt.name,
    value: pt.id
  }))
  
  const selectMediasOpt = medias.map(pt => ({
    label: pt.name,
    value: pt.id
  }))

  const total = floatToReal(formik.values.products.reduce(
    (pv, cv) => pv + (parseInt(cv.quantity.toString()) * cv.amount), 0)
  )

  return {
    addProduct,
    selectValue,
    handleSelect,
    formik,
    searchCEP,
    paymentTypes,
    selectPaymentTypesOpt,
    selectMediasOpt,
    selectProductsOpt,
    total
  }
}

const useQueryData = () => {
  const { data: paymentTypes } = useQuery(
    'sales/payment-types',
    salesApi.getPaymentTypes,
    {
      initialData: [],
      keepPreviousData: true,
      refetchOnWindowFocus: false 
    }
  )
 
  const { data: medias } = useQuery(
    'medias',
    () => mediasApi.getAllMedias(),
    {
      initialData: [],
      keepPreviousData: true,
      refetchOnWindowFocus: false 
    }
  )

  const { data: stockProducts } = useQuery(
    ['stock-products', { active: true, in_stock: true }],
    async () => stockApi.getStockProducts({ active: true, in_stock: true }),
    {
      initialData: [],
      keepPreviousData: true,
      refetchOnWindowFocus: false
    }
  )

  return {
    paymentTypes,
    medias,
    stockProducts
  }
}

export { useModalSale }