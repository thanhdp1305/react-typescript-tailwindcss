import { AuthContext } from 'providers'
import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import { getUserInfo } from 'utils'
import { ConsoleHeader, ConsoleSidebar } from './elements'

function ConsoleLayout() {
  const authContext = useContext(AuthContext)
  const [firstRender, setFirstRender] = useState(false)

  useEffect(() => {
    // did mount or update mount
    authContext.setUser(getUserInfo())
    setMode()
    detectScale()
    return () => {
      // unmount
    }
  }, [])

  const setMode = () => {
    const root = document.getElementsByTagName('html')[0]
    const mode = localStorage.getItem('mode')
    if (mode === 'dark') {
      root.setAttribute('class', 'dark')
    } else if (mode === 'light') {
      root.setAttribute('class', '')
    }
  }

  const detectScale = () => {
    const toggleSidebarMobile = document.getElementById('toggleSidebarMobile')
    const toggleSidebarMobileHamburger = document.getElementById('toggleSidebarMobileHamburger')
    const toggleSidebarMobileClose = document.getElementById('toggleSidebarMobileClose')
    const sidebarBackdrop = document.getElementById('sidebarBackdrop')
    const sidebar = document.getElementById('sidebar')

    window.onresize = function (event) {
      if (window.innerWidth < 992) {
        //
      } else if (window.innerWidth >= 1024) {
        sidebar?.classList.add('hidden')
        toggleSidebarMobileHamburger?.classList.remove('hidden')
        toggleSidebarMobileClose?.classList.add('hidden')
        sidebarBackdrop?.classList.add('hidden')
      }
    }
  }

  return (
    <>
      <ConsoleHeader />
      <div className='flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900'>
        <ConsoleSidebar />
        <div className='fixed inset-0 z-10 hidden bg-gray-900/50 dark:bg-gray-900/90' id='sidebarBackdrop'></div>
        <div id='main-content' className='relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900'>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}

export default ConsoleLayout
