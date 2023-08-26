import { FormikHelpers } from 'formik'
import { ChangeEvent } from 'react'
import { formatCEP, formatPhone, formatReal, onlyNumbers } from './number.utils'

export function handleChangeFormatReal(
  setFieldValue: FormikHelpers<any>['setFieldValue']
) {

  return (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.currentTarget
    const formatedValue = formatReal(value)

    setFieldValue(name, formatedValue)
  }
}

export function handleChangeFormatCPF(
  setFieldValue: FormikHelpers<any>['setFieldValue']
) {

  return (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.currentTarget
    const formatedValue = value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")

    setFieldValue(name, formatedValue)
  }
}

export function handleChangeFormatCEP(
  setFieldValue: FormikHelpers<any>['setFieldValue']
) {

  return (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.currentTarget
    const formatedValue = formatCEP(value)

    setFieldValue(name, formatedValue)
  }
}

export function handleChangeFormatPhone(
  setFieldValue: FormikHelpers<any>['setFieldValue']
) {

  return (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.currentTarget

    const formatedValue = formatPhone(value)

    const hasNumbers = onlyNumbers(formatedValue).length

    setFieldValue(name, hasNumbers ? formatedValue : '')
  }
}

export function makeSelectOpts(
  inputArray: {[key: string]: any}[],
  labelField: string,
  valueField: string,
  nullLabelField?: string,
): { label: string, value: string|number }[] {
  const transformedArray: { label: string, value: string|number }[] = []

  nullLabelField && transformedArray.push({
    label: nullLabelField,
    value: ''
  })

  for (const obj of inputArray) {
    if (obj[labelField] !== undefined && obj[valueField] !== undefined) {
      transformedArray.push({
        label: obj[labelField],
        value: obj[valueField]
      })
    }
  }

  return transformedArray
}