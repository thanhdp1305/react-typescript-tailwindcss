import { Navigate, Route, Routes } from 'react-router'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import { CreateAccountSuccess, Dashboard, ErrorPage, SampleCode, SignIn, SignUp, VerifyNewAccount } from 'pages'
import { ConsoleLayout } from 'ui-organisms'

const RouterRoute = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path={'/sign-in'} element={<SignIn />} />
        <Route path={'/sign-up'} element={<SignUp />} />
        <Route path={'/create-account-successfully'} element={<CreateAccountSuccess />} />
        <Route path={'/verify-new-account'} element={<VerifyNewAccount />} />
      </Route>
      <Route path='/' element={<ConsoleLayout />}>
        <Route element={<PrivateRoute />}>
          <Route
            index
            Component={() => {
              return <Navigate to={'/dashboard'} />
            }}
          />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path='/sample-code' element={<SampleCode />} />
        </Route>
      </Route>
      <Route path='*' element={<ErrorPage type='404' />} />
    </Routes>
  )
}

export default RouterRoute
