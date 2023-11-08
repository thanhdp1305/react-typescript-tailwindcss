import { useHttpRequest } from './useHttpRequest'

export const useAuthAPI = () => {
  const httpRequest = useHttpRequest()

  const refreshToken = async (params: any): Promise<any> => httpRequest.POST<any, any>('/v1/auth/refresh', params)

  const signIn = async (params: Auth.SignInParams): Promise<any> => httpRequest.POST('/v1/auth/login', params)
  const regiser = async (params: Auth.SignInParams): Promise<any> => httpRequest.POST('/v1/auth/register', params)

  return {
    refreshToken,
    signIn,
    regiser
  }
}
