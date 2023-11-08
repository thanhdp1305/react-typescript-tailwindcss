import { AuthContext } from 'providers'
import { useContext } from 'react'
import { uuidv4 } from 'utils/app'
import { useNavigate } from 'react-router'
import { get, noop } from 'lodash'
import { useAuthAPI } from 'api'
import { getAccessToken, revokeUser, setAccessToken, setRefreshToken, setUserInfo } from 'utils'

export const useAuth = () => {
  const navigate = useNavigate()
  const authAPI = useAuthAPI()
  const authContext = useContext(AuthContext)

  const getToken = () => {
    return getAccessToken()
  }

  const isLoggedIn = () => {
    return getToken() ? true : false
  }

  const fakeLogin = () => {
    setAccessToken(uuidv4())
    navigate('/')
    window.location.reload()
  }

  const logout = () => {
    revokeUser()
    navigate('/sign-in')
    window.location.reload()
  }

  const signIn = async ({ params, callback }: { params: Auth.SignInParams; callback: App.Callback }): Promise<void> => {
    const onSuccess = get(callback, 'onSuccess', noop)
    const onFailure = get(callback, 'onFailure', noop)
    const onFinish = get(callback, 'onFinish', noop)

    try {
      const response = await authAPI.signIn(params)
      signInSuccess(response)
      onSuccess(response)
    } catch (error) {
      onFailure(error)
    } finally {
      onFinish()
    }
  }

  const signInSuccess = (res: any) => {
    const user: User.Details = {
      _id: res?._id,
      full_name: res?.full_name,
      address: res?.address,
      phone: res?.phone,
      email: res?.email,
      role: res?.role,
      createdAt: res?.createdAt,
      updatedAt: res?.updatedAt
    }
    setAccessToken(res.token)
    setRefreshToken(res.refreshToken)
    setUserInfo(user)
    navigate('/')
    window.location.reload()
  }

  const register = async ({
    params,
    callback
  }: {
    params: Auth.RegisterParams
    callback: App.Callback
  }): Promise<void> => {
    const onSuccess = get(callback, 'onSuccess', noop)
    const onFailure = get(callback, 'onFailure', noop)
    const onFinish = get(callback, 'onFinish', noop)

    try {
      const response = await authAPI.regiser(params)
      onSuccess(response)
    } catch (error) {
      onFailure(error)
    } finally {
      onFinish()
    }
  }

  return {
    signIn,
    fakeLogin,
    logout,
    username: authContext.username,
    user: authContext.user,
    getToken,
    isLoggedIn,
    register
  }
}
