import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from '@material-tailwind/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegHeart, FaRegUser, FaLock } from 'react-icons/fa'
import { setToken } from '../../redux/slices/tokenSlice'
import { toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  logOutToastFire,
  logOutToastStateReset,
} from '../../redux/slices/userAuthSlice'

const ProfileMenu = () => {
  const { userData } = useSelector(state => state.userAuthReducer)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme } = useSelector(state => state.themeReducer)
  const dispatch = useDispatch()
  const { loggedOutToastState } = useSelector(state => state.userAuthReducer)
  const navigate = useNavigate()

  // Toast notification logic
  const notifySuccess = () => {
    toast.success('You have logged out successfully!', {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme,
      transition: Bounce,
      onClose: () => {
        navigate('/')
        dispatch(logOutToastStateReset())
        dispatch(setToken(null))
        closeMenu()
      },
    })
  }

  useEffect(() => {
    dispatch(logOutToastStateReset())
  }, [dispatch])

  useEffect(() => {
    if (loggedOutToastState) {
      notifySuccess()
      dispatch(logOutToastStateReset())
    }
  }, [loggedOutToastState, dispatch])

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement='bottom-end'>
      <MenuHandler>
        <Button
          variant='text'
          color='blue-gray'
          className='flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto'
        >
          <Typography className='hidden lg:block text-black dark:text-white font-bold text-xl'>
            {userData?.displayName || 'Profile'}
          </Typography>
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform text-red-500 ${
              isMenuOpen ? 'rotate-180' : ''
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className='p-1 bg-gray-900 border-none outline-none min-w-72'>
        {/* Favorite */}
        <Link to='/favorites'>
          <MenuItem
            onClick={closeMenu}
            className='flex items-center gap-2 hover:bg-red-400 transition-all'
          >
            <FaRegHeart className='text-white text-xl' />
            <Typography variant='h6' className='text-white uppercase'>
              Favorite
            </Typography>
          </MenuItem>
        </Link>
        {/* Reviews */}
        <Link to='/reviews'>
          <MenuItem
            onClick={closeMenu}
            className='flex items-center gap-2 hover:bg-red-400 transition-all'
          >
            <FaRegUser className='text-white text-xl' />
            <Typography variant='h6' className='text-white uppercase'>
              Reviews
            </Typography>
          </MenuItem>
        </Link>
        {/* Password Update */}
        <Link to='/password-update'>
          <MenuItem
            onClick={closeMenu}
            className='flex items-center gap-2 hover:bg-red-400 transition-all'
          >
            <FaLock className='text-white text-xl' />
            <Typography variant='h6' className='text-white uppercase'>
              Password Update
            </Typography>
          </MenuItem>
        </Link>
        {/* Logout */}
        <MenuItem
          onClick={() => dispatch(logOutToastFire())}
          className='flex items-center gap-2 hover:bg-red-400 transition-all'
        >
          <FaRegHeart className='text-white text-xl' />
          <Typography variant='h6' className='text-white uppercase'>
            Log Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default ProfileMenu
