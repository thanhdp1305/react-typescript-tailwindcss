declare namespace Auth {
  export interface AuthContextProps {
    username: string
    user: User.Details
  }

  export interface SignInParams {
    email: string
    password: string
  }

  export interface RegisterParams {
    email: string
    password: string
    address: string
    full_name: string
    phone: string
  }
}
