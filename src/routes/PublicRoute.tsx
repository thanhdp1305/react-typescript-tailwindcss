import { useAuth } from 'hooks'
import { Navigate, Outlet } from 'react-router'

function PublicRoute(props: any) {
  const auth = useAuth()
  const logged = auth.isLoggedIn()

  return !logged ? <Outlet /> : <Navigate to={'/dashboard'} />
}

export default PublicRoute
