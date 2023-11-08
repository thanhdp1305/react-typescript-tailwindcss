import { useEffect } from 'react'

function GuestLayout(props: any) {
  useEffect(() => {
    setMode()
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

  return <>{props.children}</>
}

export default GuestLayout
