import { useEffect, useState } from 'react'
import logo from 'assets/react.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from 'hooks'
import { valiator } from 'utils'
import RegexHelper from 'constant/RegexHelper'
import { GuestLayout } from 'ui-organisms'
import UIHelperClass from 'constant/UIHelper'
import { Button } from 'ui-atoms'

function SignUp() {
  const navigate = useNavigate()
  const auth = useAuth()
  const [firstRender, setFirstRender] = useState(false)
  const [form, setForm] = useState({
    name: '',
    agency: null,
    email: '',
    phoneNumber: '',
    password: ''
  })
  const [errors, setErrors] = useState<any>({
    name: '',
    agency: '',
    email: '',
    phoneNumber: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorRequest, setErrorRequest] = useState('')

  useEffect(() => {
    // did mount or update mount
    if (firstRender == false) {
      renderClass()
    }

    return () => {
      // unmount
    }
  }, [])

  useEffect(() => {
    setErrorRequest('')
  }, [form])

  const renderClass = () => {
    setFirstRender(true)
  }

  const onChangeName = (e: any) => {
    setForm((form: any) => {
      return { ...form, name: e.target.value }
    })
  }

  const onChangeAgency = (e: any) => {
    console.log(e.target.value)
    setForm((form: any) => {
      return { ...form, agency: e.target.value }
    })
  }

  const onChangeEmail = (e: any) => {
    setForm((form: any) => {
      return { ...form, email: e.target.value }
    })
  }

  const onChangePhoneNumber = (e: any) => {
    setForm((form: any) => {
      return { ...form, phoneNumber: e.target.value }
    })
  }

  const validateName = (): string => {
    const err = valiator.validate(form.name, {
      required: true,
      errorsMessage: { required: 'This field is required.' }
    })
    setErrors((errors: any) => {
      return { ...errors, name: err || '' }
    })

    return err
  }

  const onChangePassword = (e: any) => {
    setForm((form: any) => {
      return { ...form, password: e.target.value }
    })
  }

  const validateAgency = (): string => {
    const err = valiator.validate(form.agency, {
      required: true,
      errorsMessage: { required: 'This field is required.' }
    })
    setErrors((errors: any) => {
      return { ...errors, agency: err || '' }
    })

    return err
  }

  const validateEmail = (): string => {
    const err = valiator.validate(form.email, {
      required: true,
      errorsMessage: { required: 'This field is required.' }
    })
    setErrors((errors: any) => {
      return { ...errors, email: err || '' }
    })

    return err
  }

  const validatePhoneNumber = (): string => {
    const err = valiator.validate(form.phoneNumber, {
      required: true,
      pattern: RegexHelper.NUMBER,
      errorsMessage: { required: 'This field is required.' }
    })
    setErrors((errors: any) => {
      return { ...errors, phoneNumber: err || '' }
    })

    return err
  }

  const validatePassword = (): string => {
    const err = valiator.validate(form.password, {
      required: true,
      errorsMessage: { required: 'This field is required.' }
    })
    setErrors((errors: any) => {
      return { ...errors, password: err || '' }
    })

    return err
  }

  const validateForm = (): boolean => {
    const arrRes = []
    arrRes.push(validateName())
    arrRes.push(validateEmail())
    arrRes.push(validateAgency())
    arrRes.push(validatePhoneNumber())
    arrRes.push(validatePassword())

    return arrRes.findIndex((x) => x && x.length > 0) < 0
  }

  const submitForm = (event: any) => {
    event.preventDefault()

    if (!validateForm()) return

    requestRegister()
  }

  const goToCreateAccountSuccessfullyPage = () => {
    navigate({
      pathname: '/create-account-successfully',
      search: '?email=' + form.email
    })
  }

  const requestRegister = () => {
    setIsSubmitting(true)
    const params: Auth.RegisterParams = {
      email: form.email,
      password: form.password,
      address: form.agency || '',
      full_name: form.name,
      phone: form.phoneNumber
    }
    auth.register({
      params: params,
      callback: {
        onSuccess: (res: any) => {
          goToCreateAccountSuccessfullyPage()
        },
        onFailure: (err) => {
          setErrorRequest(err?.message)
          setIsSubmitting(false)
        },
        onFinish: () => {
          setIsSubmitting(false)
        }
      }
    })
  }

  return (
    <GuestLayout>
      <main className='bg-gray-50 dark:bg-gray-900'>
        <div className='flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900'>
          <a href='#' className='flex items-center justify-center mb-8 text-2xl font-bold lg:mb-10 dark:text-white'>
            {/* <img src={logo} className='mr-4 h-11' alt='React Vite Base'></img> */}
            <span>React Vite Base</span>
          </a>
          <div className='w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>Sign up to platform</h2>
            <form className='mt-8 space-y-6' onSubmit={(e: any) => submitForm(e)}>
              <div>
                <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Name <span className='text-red-600'>*</span>
                </label>
                <input
                  type='text'
                  name='Name'
                  id='name'
                  className={[
                    'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
                    errors.name ? UIHelperClass.INVALID_CLASS : ''
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  placeholder='Name'
                  value={form.name || ''}
                  onChange={onChangeName}
                  onBlur={validateName}
                />
                <p className='text-red-600 mt-1'>{errors.name}</p>
              </div>
              <div>
                <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Email <span className='text-red-600'>*</span>
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  className={[
                    'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
                    errors.email ? UIHelperClass.INVALID_CLASS : ''
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  placeholder='Email'
                  value={form.email || ''}
                  onChange={onChangeEmail}
                  onBlur={validateEmail}
                />
                <p className='text-red-600 mt-1'>{errors.email}</p>
              </div>
              <div>
                <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Phone Number <span className='text-red-600'>*</span>
                </label>
                <input
                  type='text'
                  name='phonenumber'
                  id='phonenumber'
                  className={[
                    'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
                    errors.phoneNumber ? UIHelperClass.INVALID_CLASS : ''
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  placeholder='Phone Number'
                  value={form.phoneNumber || ''}
                  onChange={onChangePhoneNumber}
                  onBlur={validatePhoneNumber}
                />
                <p className='text-red-600 mt-1'>{errors.phoneNumber}</p>
              </div>
              <div>
                <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Password <span className='text-red-600'>*</span>
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  className={[
                    'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
                    errors.password ? UIHelperClass.INVALID_CLASS : ''
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  placeholder='Password'
                  value={form.password || ''}
                  onChange={onChangePassword}
                  onBlur={validatePassword}
                />
                <p className='text-red-600 mt-1'>{errors.password}</p>
              </div>
              <p className='text-red-600 mt-3'>{errorRequest}</p>
              <Button
                type='submit'
                isLoading={isSubmitting}
                className='w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                Create account
              </Button>
              <div className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                Registered?{' '}
                <Link to={'/sign-in'} className='text-blue-700 hover:underline dark:text-blue-500'>
                  Login to your account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </GuestLayout>
  )
}

export default SignUp
