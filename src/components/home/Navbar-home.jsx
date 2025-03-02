import React from 'react'
import {Link} from "react-router-dom"
import SearchInput from './Search-input'
import { OrganizationSwitcher, UserButton } from '@clerk/clerk-react'
const NavbarHome = () => {
  return (
    <nav className='flex items-center justify-between h-full w-ful'>
      <div className='flex gap-2 items-center shrink-0 '>
      <Link to="/">
        <img src="/logo.svg" alt="logo" width={36} height={36} />
         </Link>
         <h3 className='text-xl'>Docs</h3>
      </div>
      <SearchInput/>
      <div className='flex items-center gap-6 pl-6'>
      
      <OrganizationSwitcher
      afterSelectPersonalUrl="/"
      afterLeaveOrganizationUrl='/'
      afterSelectOrganizationUrl="/"
      afterCreateOrganizationUrl="/"
      />
      <UserButton/>
      
      </div>
    </nav>
  )
}

export default NavbarHome