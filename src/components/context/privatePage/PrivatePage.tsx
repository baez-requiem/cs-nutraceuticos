import { FC, ReactNode, useEffect, useState } from "react"
import { useMutation } from "react-query"
import { getStorageAuth } from "src/utils/localstorage"
import { auth } from 'src/services/api'
import useLogout from "src/hooks/useLogout"
import { PageLoader } from "src/components/template"

type MatchRoleType = 'master' | 'seller' | 'admin'

interface PrivatePageProps {
  children: ReactNode
  roles: MatchRoleType[]
}

const PrivatePage: FC<PrivatePageProps> = ({
  children,
  roles = [],
}) => {
  const [hasPermission, setHasPermission] = useState(false)

  const matchUserRoleMutation = useMutation(auth.matchUserRole)

  const { logout } = useLogout()

  useEffect(() => {
    !hasPermission && (async function(){
      const storageAuth = getStorageAuth()
      const id_user = storageAuth?.user.id || ''
  
      const { match } = await matchUserRoleMutation.mutateAsync({ id_user, roles })

      !match && logout()

      setHasPermission(match)
    })()
  }, [])

  if (hasPermission) {
    return <>{children}</>
  } else {
    return <PageLoader />
  }
  
}

export default PrivatePage