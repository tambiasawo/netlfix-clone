import React from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SearchIcon from '@mui/icons-material/Search'
import Link from 'next/link'
import useAuth from '../hooks/useAuth'
import Tooltip from '@mui/material/Tooltip'
const Header = () => {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const { logout, loading } = useAuth()
  React.useEffect(() => {
    /* use this to make sure the component has mounted befire addng eventlistner. */

    const handleScroll = () => {
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false)
    }
    document.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (loading) return null
  return (
    <header className={`${isScrolled ? 'bg-[#141414]' : ''}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
        <ul className="hidden space-x-4 md:flex ">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>
      <div className="flex items-center space-x-4 font-light">
        <SearchIcon className="hidden h-6 w-6 md:flex" />
        <p className="hidden lg:flex">Kids</p>
        <NotificationsIcon />

        <Link href="/account">
          <Tooltip title="Logout">
            <img
              onClick={logout}
              src="https://rb.gy/g1pwyx"
              alt=""
              className="cursor-pointer rounded"
            />
          </Tooltip>
        </Link>
      </div>
    </header>
  )
}

export default Header
