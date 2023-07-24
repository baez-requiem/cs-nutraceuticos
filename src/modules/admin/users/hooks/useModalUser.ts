import { useFormik } from "formik"
import { initialDataFormUser } from "../constants"
import { consultCep } from "src/services/viacep"
import { UserType } from "src/services/api/users/users.types"
import { useEffect } from "react"
import { useMutation, useQuery } from "react-query"
import { toast } from "react-toastify"
import { rolesApi, salesTeamApi, usersApi } from "src/services/api"
import { formatCPF, formatPhone, onlyNumbers } from "src/utils/number.utils"
import { parseUserForm } from "../utils"

const useModalUser = (
  show: boolean,
  onClose: (arg0?: boolean) => void,
  data?: UserType
) => {

  const { data: roles } = useQuery(
    ['roles'],
    async () => await rolesApi.getAllRoles(),
    { initialData: [], keepPreviousData: true, refetchOnWindowFocus: false }
  )

  const { data: salesTeam } = useQuery(
    ['sales-team'],
    async () => await salesTeamApi.getAllSalesTeam(),
    { initialData: [], keepPreviousData: true, refetchOnWindowFocus: false }
  )

  const userMutation = useMutation(async (values: typeof initialDataFormUser) => {
    const idUser = data?.id

    toast.loading(`${idUser ? 'Atualizando' : 'Inserindo'} dados...`)

    const formatedData = {
      ...values,
      initial_date: values.initial_date || null,
      cpf: onlyNumbers(values.cpf),
      rg: onlyNumbers(values.rg),
      phone: onlyNumbers(values.phone),
      cep: onlyNumbers(values.cep),
    }

    const ok = idUser
      ? await usersApi.updateUser({ ...formatedData, id: idUser })
      : await usersApi.createUser(formatedData)

    toast.dismiss()

    if (ok) {
      toast.error(`Houve um erro ao ${ok ? 'atualizar' : 'cadastrar'} o usuário.`)
    } else {
      toast.success(`Usuário ${ok ? 'atualizado' : 'cadastrado'} com sucesso!`)
      onClose(true)
    }
  })

  const formik = useFormik({
    initialValues: initialDataFormUser,
    onSubmit(values) {
      userMutation.mutateAsync(values)
    },
  })

  const searchCEP = async () => {
    const cep = formik.values.cep || ''

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
    data?.id
      ? formik.setValues(parseUserForm(data))
      : formik.resetForm()
  }, [show])

  return {
    roles,
    salesTeam,
    formik,
    searchCEP
  }
}

export { useModalUser }