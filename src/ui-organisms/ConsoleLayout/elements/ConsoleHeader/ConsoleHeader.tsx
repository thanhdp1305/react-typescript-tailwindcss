import { IconSvg } from 'ui-atoms'
import logo from 'assets/react.svg'
import { useAuth } from 'hooks'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from 'providers'
import { Dropdown } from 'flowbite-react'

function ConsoleHeader(props: any) {
  const auth = useAuth()
  const authContext = useContext(AuthContext)
  const [userInfo, setUserInfo] = useState<User.Details>()
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  useEffect(() => {
    // did mount or update mount
    setMode()
    return () => {
      // unmount
    }
  }, [])

  const getUserInfo = () => {
    return authContext.user
  }

  const setMode = () => {
    const root = document.getElementsByTagName('html')[0]
    const mode = localStorage.getItem('mode')
    if (mode === 'dark') {
      root.setAttribute('class', 'dark')
      setIsDarkMode(true)
    } else if (mode === 'light') {
      root.setAttribute('class', '')
      setIsDarkMode(false)
    }
  }

  const switchDarkMode = () => {
    const root = document.getElementsByTagName('html')[0]
    if (root.classList.contains('dark')) {
      root.setAttribute('class', '')
      setIsDarkMode(false)
      localStorage.setItem('mode', 'light')
    } else {
      root.setAttribute('class', 'dark')
      setIsDarkMode(true)
      localStorage.setItem('mode', 'dark')
    }
  }

  const showSideBar = () => {
    const toggleSidebarMobile = document.getElementById('toggleSidebarMobile')
    const toggleSidebarMobileHamburger = document.getElementById('toggleSidebarMobileHamburger')
    const toggleSidebarMobileClose = document.getElementById('toggleSidebarMobileClose')
    const sidebarBackdrop = document.getElementById('sidebarBackdrop')
    const sidebar = document.getElementById('sidebar')

    sidebar?.classList.remove('hidden')
    toggleSidebarMobileHamburger?.classList.add('hidden')
    toggleSidebarMobileClose?.classList.remove('hidden')
    sidebarBackdrop?.classList.remove('hidden')
  }

  const hideSideBar = () => {
    const toggleSidebarMobile = document.getElementById('toggleSidebarMobile')
    const toggleSidebarMobileHamburger = document.getElementById('toggleSidebarMobileHamburger')
    const toggleSidebarMobileClose = document.getElementById('toggleSidebarMobileClose')
    const sidebarBackdrop = document.getElementById('sidebarBackdrop')
    const sidebar = document.getElementById('sidebar')

    sidebar?.classList.add('hidden')
    toggleSidebarMobileHamburger?.classList.remove('hidden')
    toggleSidebarMobileClose?.classList.add('hidden')
    sidebarBackdrop?.classList.add('hidden')
  }

  const signOut = () => {
    auth.logout()
  }

  return (
    <>
      <nav className='fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
        <div className='px-3 py-3 lg:px-5 lg:pl-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start'>
              <button
                id='toggleSidebarMobile'
                aria-expanded='true'
                aria-controls='sidebar'
                className='p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              >
                <svg
                  onClick={showSideBar}
                  id='toggleSidebarMobileHamburger'
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <svg
                  id='toggleSidebarMobileClose'
                  onClick={hideSideBar}
                  className='hidden w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </button>
              <a href='#' className='flex ml-2 md:mr-24'>
                {/* <img src={logo} className='h-8 mr-3' alt='React Vite Base' /> */}
                <span className='self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white'>
                  React Vite Base
                </span>
              </a>
              <form action='#' method='GET' className='hidden lg:block lg:pl-3.5'>
                <label htmlFor='topbar-search' className='sr-only'>
                  Search
                </label>
                <div className='relative mt-1 lg:w-96'>
                  <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                    <IconSvg icon='headerSearch' />
                  </div>
                  <input
                    type='text'
                    name='email'
                    id='topbar-search'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                    placeholder='Search'
                  />
                </div>
              </form>
            </div>
            <div className='flex items-center'>
              <button
                id='theme-toggle'
                type='button'
                className='text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5'
                onClick={switchDarkMode}
              >
                {!isDarkMode ? <IconSvg icon='darkMode' /> : <IconSvg icon='lightMode' />}
              </button>
              <div className='flex items-center ml-3'>
                <div>
                  <button
                    type='button'
                    className='flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
                    id='user-menu-button-2'
                    aria-expanded='false'
                    data-dropdown-toggle='dropdown-2'
                  >
                    <span className='sr-only'>Open user menu</span>
                    <img
                      className='w-8 h-8 rounded-full'
                      src='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
                      alt='user photo'
                    />
                  </button>
                </div>

                <div
                  className='z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600'
                  id='dropdown-2'
                  data-popper-placement='bottom'
                >
                  <div className='px-4 py-3' role='none'>
                    <p className='text-sm text-gray-900 dark:text-white' role='none'>
                      {getUserInfo()?.full_name || 'text@text.com'}
                    </p>
                    <p className='text-sm font-medium text-gray-900 truncate dark:text-gray-300' role='none'>
                      {getUserInfo()?.email || 'text@text.com'}
                    </p>
                  </div>
                  <ul className='py-1' role='none'>
                    <li>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                        role='menuitem'
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                        role='menuitem'
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                        role='menuitem'
                        onClick={signOut}
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default ConsoleHeader
