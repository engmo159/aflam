import { useEffect, useState } from 'react'
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from '@material-tailwind/react'
import { Link, NavLink } from 'react-router-dom'
import { PiSunBold } from 'react-icons/pi'
import { MdNightlightRound } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { changeTheme } from '../redux/slices/themeSlice'
import Signin from './Signin'

const NavBar = () => {
  const [openNav, setOpenNav] = useState(false)
  const [navScrolled, setNavScrolled] = useState(false)
  const { theme } = useSelector(state => state.themeReducer)
  const [showSignInModal, setShowSignInModal] = useState(false)

  const dispatch = useDispatch()
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavScrolled(true)
      } else {
        setNavScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    )
  }, [])

  const navList = (
    <ul
      className={`mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-black dark:text-white`}
    >
      <Typography
        as='li'
        variant='small'
        className='flex items-center gap-x-2 p-1 font-medium tracking-wider'
      >
        <NavLink className='uppercase' to='/'>
          home
        </NavLink>
      </Typography>
      <Typography
        as='li'
        variant='small'
        className='flex items-center gap-x-2 p-1 font-medium tracking-wider'
      >
        <NavLink className='uppercase' to='/movie'>
          movies
        </NavLink>
      </Typography>
      <Typography
        as='li'
        variant='small'
        className='flex items-center gap-x-2 p-1 font-medium tracking-wider'
      >
        <NavLink className='uppercase' to='/tv'>
          tv series
        </NavLink>
      </Typography>
      <Typography
        as='li'
        variant='small'
        className='flex items-center gap-x-2 p-1 font-medium tracking-wider'
      >
        <NavLink className='uppercase' to='/search'>
          search
        </NavLink>
      </Typography>
      <Typography
        as='li'
        variant='small'
        color='white'
        className='flex items-center gap-x-2 p-1 font-medium tracking-wider'
      >
        <IconButton
          variant='text'
          className='text-2xl'
          onClick={() => {
            dispatch(changeTheme())
          }}
        >
          {theme === 'dark' ? (
            <PiSunBold className='text-white' />
          ) : (
            <MdNightlightRound className='' />
          )}
        </IconButton>
      </Typography>
    </ul>
  )

  return (
    <>
      <Navbar
        className={`mx-auto max-w-screen-4xl px-4 py-2 border-none rounded-none z-50 fixed backdrop-saturate-100 ${
          navScrolled
            ? ' dark:bg-gray-900'
            : 'bg-transparent backdrop-blur-none shadow-none '
        }`}
      >
        <div className='container mx-auto flex items-center justify-between text-white '>
          <div className='flex gap-x-4'>
            <Link
              to='/'
              className='mr-4 cursor-pointer py-1.5 font-bold text-2xl text-black dark:text-white'
            >
              Redux <span className='text-red-500'>Movies</span>
            </Link>

            <div className='hidden lg:block'>{navList}</div>
          </div>
          <div className='flex items-center gap-x-1'>
            <Button
              variant='gradient'
              size='md'
              className='hidden lg:inline-block tracking-wider text-white text-md'
              color='red'
              onClick={() => setShowSignInModal(true)}
            >
              Sign in
            </Button>
          </div>
          <IconButton
            variant='text'
            className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                className='h-6 w-6'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <div className='container mx-auto'>
            {navList}
            <div className='flex items-center gap-x-1'>
              <Button fullWidth variant='text' size='sm' className=''>
                <span>Log In</span>
              </Button>
              <Button fullWidth variant='gradient' size='sm' className=''>
                <span>Sign in</span>
              </Button>
            </div>
          </div>
        </Collapse>
      </Navbar>
      <Signin
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    </>
  )
}
export default NavBar
