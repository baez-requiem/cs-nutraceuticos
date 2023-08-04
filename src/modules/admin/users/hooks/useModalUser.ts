import { useFormik } from "formik"
import { initialDataFormUser } from "../constants"
import { consultCep } from "src/services/viacep"
import { UserType } from "src/services/api/users/users.types"
import { useEffect } from "react"
import { useMutation, useQuery } from "react-query"
import { toast } from "react-toastify"
import { rolesApi, salesTeamApi, usersApi } from "src/services/api"
import { parseUserForm } from "../utils"
import { parseUserSubmit, validateUser } from "../utils/validation"
import { useRefetchQueries } from "src/hooks"

const useModalUser = (
  show: boolean,
  onClose: () => void,
  data?: UserType
) => {

  const { refetchQueries } = useRefetchQueries()

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

    const toastId = toast.loading(`${idUser ? 'Atualizando' : 'Inserindo'} dados...`)

    const parsedValues = parseUserSubmit(values)

    const ok = idUser
      ? await usersApi.updateUser({ ...parsedValues, id: idUser })
      : await usersApi.createUser(parsedValues)

    toast.dismiss(toastId)

    if (!ok) {
      toast.error(`Houve um erro ao ${ok ? 'atualizar' : 'cadastrar'} o usuário.`)
    } else {
      toast.success(`Usuário ${ok ? 'atualizado' : 'cadastrado'} com sucesso!`)
      refetchQueries(['users'])
      onClose()
    }
  })

  const formik = useFormik({
    initialValues: initialDataFormUser,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    validate: values => validateUser(values, data?.id),
    onSubmit: values => userMutation.mutateAsync(values)
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