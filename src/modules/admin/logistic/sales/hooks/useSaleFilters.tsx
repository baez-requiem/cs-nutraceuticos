import { useFormik } from "formik"
import { useQuery } from "react-query"
import { logisticApi, productsApi, salesApi, usersApi } from "src/services/api"
import { makeSelectOpts } from "src/utils/form.utils"
import { initialDataSalesFilters } from "../constants"
import { removeNullAndEmptyFields } from "src/utils/objetct"

interface UseSaleFiltersProps {
    onFilter: (
        arg0: {
            init_date?: string
            end_date?: string
            status?: string
            seller?: string
            client_name?: string
            client_phone?: string
            number?: number
            products?: string[]
        }
    ) => void
}

const useSaleFilters = ({ onFilter }: UseSaleFiltersProps) => {

    const formik = useFormik({
        initialValues: initialDataSalesFilters,
        onSubmit: values => {
            onFilter(removeNullAndEmptyFields({...values, products: [values.products]}))
        },
      })

    const { data: saleStatus } = useQuery(
        'logistic/sale-status',
        logisticApi.getSaleStatus,
        { initialData: [], keepPreviousData: true, refetchOnWindowFocus: false }
    )

    const { data: users } = useQuery(
        ['users', { user_role: 'seller' }],
        async () => usersApi.getAllUsers({ user_role: 'seller' }),
        { initialData: [], keepPreviousData: true, refetchOnWindowFocus: false }
    )

    const { data: products } = useQuery(
        'products',
        async () => productsApi.getAllProducts(),
        { initialData: [], keepPreviousData: true, refetchOnWindowFocus: false }
    )

    const { data: paymentTypes } = useQuery(
        'sales/payment-types',
        salesApi.getPaymentTypes,
        { initialData: [], keepPreviousData: true, refetchOnWindowFocus: false }
    )

    const statusOpts = makeSelectOpts(saleStatus, 'status', 'id', 'Todos')
    const usersOpts = makeSelectOpts(users, 'name', 'id', 'Todos')
    const productsOpts = makeSelectOpts(products, 'name', 'id', 'Todos')
    const paymentTypesOpts = makeSelectOpts(paymentTypes, 'name', 'id', 'Todos')

    return {
        formik,
        statusOpts,
        usersOpts,
        productsOpts,
        paymentTypesOpts,
    }
}

export { useSaleFilters }