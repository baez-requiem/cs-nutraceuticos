import { ChangeEvent, useState, useEffect } from "react"

import { useFormik } from "formik"
import { initialDataFormSale } from "../constants"

import { useMutation, useQuery, useQueryClient } from "react-query"

import { consultCep } from "src/services/viacep"

import { mediasApi, salesApi, stockApi } from "src/services/api"
import { SaleBodyType } from "src/services/api/sales/sales.types"
import { Sale } from "src/services/api/logistic/logistic.types"

import { toast } from "react-toastify"

import {
  floatToReal,
} from "src/utils/number.utils"

import { validateSale } from "../utils/validations"
import { parseSaleFormSubmit, parseSaleFormValues } from "../utils/mappers"

const useSaleModal = (
  show: boolean,
  data: Sale | null,
  onClose: () => void
) => {
  const [selectValue, setSelectValue] = useState<string>('')

  const {
    medias,
    stockProducts
  } = useQueryData()

  const createNewSaleMutation = useMutation(async (values: SaleBodyType) => {
    const toastId = toast.loading(`Inserindo dados...`)
    const isUpdate = !!data?.id

    const ok = isUpdate
      ? await salesApi.updateSale(values)
      : await salesApi.createNewSale(values)

    toast.dismiss(toastId)

    ok
      ? toast.success(`Venda ${isUpdate ? 'atualizada' : 'efetuada'} com sucesso!`)
      : toast.error(`Houve um erro ao ${isUpdate ? 'atualizar' : 'efetuadar'} a venda.`)

    onClose()
  })

  const formik = useFormik({
    initialValues: initialDataFormSale,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    validate: (values) => validateSale(values),
    onSubmit: values => createNewSaleMutation.mutateAsync(parseSaleFormSubmit(values, data?.id))
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
        amount: hasProduct.amount
      }
    ]

    formik.setFieldValue('products', formProducts)

    const slcValue = stockProducts.filter(p => !formProducts.find(fp => fp.id_product === p.id))[0]?.id || ''

    setSelectValue(slcValue.toString())
  }

  const removeProduct = (id: string) => {
    const formProducts = formik.values.products.filter(p => p.id_product !== id)

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
    }

    if (data) {
      formik.setValues(parseSaleFormValues(data))
    } else {
      medias.length && formik.setFieldValue('media_id', medias[0].id)
    }

    const slcValue = stockProducts.filter(p => !formik.values.products.find(fp => fp.id_product === p.id))[0]?.id || ''

    setSelectValue(slcValue.toString())
  }, [stockProducts, medias, show])

  const selectProductsOpt = stockProducts
    .filter(p => !formik.values.products.find(nsp => nsp.id_product === p.id))
    .map(p => ({ label: p.name, value: p.id }))

  const selectMediasOpt = medias.map(pt => ({
    label: pt.name,
    value: pt.id
  }))

  const total = floatToReal(formik.values.products.reduce(
    (pv, cv) => pv + (parseInt(cv.quantity.toString()) * cv.amount), 0)
  )

  return {
    addProduct,
    removeProduct,
    selectValue,
    handleSelect,
    formik,
    searchCEP,
    selectMediasOpt,
    selectProductsOpt,
    total
  }
}

const useQueryData = () => {
  const { data: medias } = useQuery(
    ['medias', { active: true }],
    async () => mediasApi.getAllMedias({ active: true }),
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
    medias,
    stockProducts
  }
}

export { useSaleModal }