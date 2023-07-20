import { useMutation, useQuery } from "react-query"
import { Navigate } from "react-router-dom"
import { getStorageAuth } from "src/utils/localstorage"
import { auth } from 'src/services/api'
import { FC, ReactNode, useEffect, useState } from "react"
import useLogout from "src/hooks/useLogout"
import Loader from "../loader/Loader"
import { PageLoader } from "src/components/template"

type MatchRoleType = 'Master' | 'Vendedor' | 'Admin'

interface PrivateComponentProps {
  children: ReactNode
  roles: MatchRoleType[]
  logout?: boolean
}

const PrivateComponent: FC<PrivateComponentProps> = ({
  children,
  roles = [],
  logout: hasLogout
}) => {
  const matchUserRoleMutation = useMutation(auth.matchUserRole)
  const { logout } = useLogout()
  const [hasPermission, setHasPermission] = useState(false)

  useEffect(() => {
    !hasPermission && (async function(){
      const storageAuth = getStorageAuth()
      const id_user = storageAuth?.refreshToken?.userId || ''
  
      const { match } = await matchUserRoleMutation.mutateAsync({ id_user, roles })

      await new Promise(r => setTimeout(r, 2000))

      !match && hasLogout && logout()

      setHasPermission(match)
    })()
  }, [])

  if (!hasLogout) {
    return <>{hasPermission && children}</>
  } else if (hasPermission) {
    return <>{children}</>
  } else {
    return <PageLoader />
  }
  
}

export default PrivateComponent