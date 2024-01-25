import { ChangeEvent, useState, useEffect, useMemo } from "react"
import { FormikProps } from "formik"
import { initialDataFormSale } from "../constants"
import { useQuery } from "react-query"
import { salesApi } from "src/services/api"
import { floatToReal, realToFloat } from "src/utils/number.utils"

const usePaymentMenthods = (
  formik: FormikProps<typeof initialDataFormSale>
) => {
  const [selectValue, setSelectValue] = useState('')

  const { data: paymentTypes } = useQuery(
    'sales/payment-types',
    salesApi.getPaymentTypes,
    { initialData: [], keepPreviousData: true, refetchOnWindowFocus: false }
  )

  const handleSelect = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => setSelectValue(value)

  const updateSelectValue = () => {
    const formPaymentMethods = formik.values.payment_types

    const filteredPaymentTypes = paymentTypes
      .filter(pt => !formPaymentMethods.find(fpm => fpm.id_payment_type === pt.id))

    const slcValue = filteredPaymentTypes[0]?.id || ''

    setSelectValue(slcValue)
  }

  const updateFirstPaymentMethod = () => {
    const formPaymentMethods = formik.values.payment_types

    if (!formPaymentMethods.length || formPaymentMethods.length > 1) return;

    fillRemainingValue(formPaymentMethods[0].id_payment_type)()
  }

  const addPaymentMethod = () => {
    const id = selectValue

    const paymentMethods = formik.values.payment_types

    const hasInForm = paymentMethods.find(paymentMethod => paymentMethod.id_payment_type === id)

    if (hasInForm) return

    const paymentType = paymentTypes.find(paymentType => paymentType.id === id)

    if (!paymentType) return

    formik.setFieldValue('payment_types', [
      ...paymentMethods,
      {
        id_payment_type: id,
        name: paymentType.name,
        amount: '0,00',
        card_installments: '',
        paid: ''
      }
    ])
  }
  
  const removePaymentMethod = (id: string) => () => {
    const newPaymentMethods = formik.values.payment_types
      .filter(paymentType => paymentType.id_payment_type !== id)

    formik.setFieldValue('payment_types', newPaymentMethods)
  }

  const fillRemainingValue = (id: string) => () => {
    const paymentMethods = formik.values.payment_types

    const othersPaymentMethods = paymentMethods.filter(pm => pm.id_payment_type !== id)

    const totalInOthersPaymentMethods = othersPaymentMethods.reduce((pv, cv) => pv + realToFloat(cv.amount || '0,00'), 0)

    const totalWithDiscounts = formik.values.products
      .reduce((pv, cv) => pv + (parseInt(cv.quantity.toString()) * cv.amount), 0) - realToFloat(formik.values.discounts || '0')

    const totalToFill = totalWithDiscounts - totalInOthersPaymentMethods

    const newPaymentMethods = paymentMethods.map(pm => {
      if (pm.id_payment_type === id) {
        return {
          ...pm,
          amount: floatToReal(totalToFill)
        }
      }

      return pm
    })

    formik.setFieldValue('payment_types', newPaymentMethods)
  }

  const hasChangedUseEffectValues = useMemo(() => JSON.stringify([paymentTypes, formik.values]), [paymentTypes, formik.values])

  useEffect(() => {
    if (paymentTypes.length) {
      updateSelectValue()
      updateFirstPaymentMethod()
    }
  }, [hasChangedUseEffectValues])

  const paymentTypesOpts = paymentTypes
    .filter(paymentType => !formik.values.payment_types.find(pt => pt.id_payment_type === paymentType.id))
    .map(paymentType => ({
      label: paymentType.name,
      value: paymentType.id
    }))

  const isCreditCard = (
    paymentType: typeof formik.values.payment_types[0]
  ) => paymentType.id_payment_type === 'credit_card'

  return {
    paymentTypesOpts,
    addPaymentMethod,
    selectValue,
    handleSelect,
    isCreditCard,
    removePaymentMethod,
    fillRemainingValue
  }
}

export { usePaymentMenthods }