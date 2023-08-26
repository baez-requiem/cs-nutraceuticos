import { useMutation } from 'react-query'
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import { auth } from 'src/services/api'
import { toast } from 'react-toastify'

const initialValues = {
  username: '',
  password: ''
}

const useLogin = () => {
  const navigate = useNavigate()

  const mutation = useMutation(async (values: typeof initialValues) => {
    const toastId = toast.loading("Validando os dados...")

    const data = await auth.login(values)

    toast.dismiss(toastId)
    
    if ('error' in data) {
      toast.error(data.error.message)
      return
    }

    localStorage.setItem('auth', JSON.stringify(data))

    if (data.user.role == 'Vendedor') {
      navigate('/seller/dashboard')
    } else {
      navigate('/admin/dashboard')
    }

  })

  const formik = useFormik({
    initialValues,
    onSubmit: values => mutation.mutateAsync(values),
  })

  return {
    formik,
    mutation
  }
}

export { useLogin }