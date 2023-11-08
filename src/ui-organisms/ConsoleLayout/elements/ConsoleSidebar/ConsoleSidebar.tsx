import { Link } from 'react-router-dom'
import { IconSvg } from '../../../../ui-atoms'
import { Sidebar } from 'flowbite-react'
import { HiChartPie, HiTable } from 'react-icons/hi'

function ConsoleSidebar() {
  return (
    <aside
      id='sidebar'
      className='fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width hidden'
      aria-label='Sidebar'
    >
      <Sidebar
        aria-label='Default sidebar example'
        className='relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700'
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href='#' icon={HiChartPie}>
              <p>Dashboard</p>
            </Sidebar.Item>
            <Sidebar.Collapse label='Parent menu' icon={HiChartPie}>
              <Sidebar.Item href='#'>Submenu 1</Sidebar.Item>
              <Sidebar.Item href='#'>Submenu 2</Sidebar.Item>
            </Sidebar.Collapse>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </aside>
  )
}

export default ConsoleSidebar
