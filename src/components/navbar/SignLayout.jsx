/* eslint-disable react/prop-types */
import { Card, Typography } from '@material-tailwind/react'
import SignUp from './SignUp'
import SignIn from './SignIn'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { switchShowSignInModal } from '../../redux/slices/userAuthSlice'
const SignLayout = () => {
  const dispatch = useDispatch()
  const { showSignInModal } = useSelector(state => state.userAuthReducer)
  // sign in overlay function
  const handleOverlayClick = e => {
    if (e.target.id === 'overlay') {
      dispatch(switchShowSignInModal())
    }
  }
  // signIn State
  const [showSignIn, setShowSignIn] = useState(true)
  return (
    <div>
      {showSignInModal && (
        <div
          id='overlay'
          onClick={handleOverlayClick}
          className='fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center '
        >
          <Card className='lg:w-1/3 p-8 bg-gray-900 flex gap-4'>
            <Typography
              variant='h4'
              className='py-1.5 font-bold text-2xl
             text-white text-center'
            >
              Redux
              <span className='text-ourRed'> Movies</span>
            </Typography>
            {showSignIn ? (
              <SignIn setShowSignIn={setShowSignIn} />
            ) : (
              <SignUp setShowSignIn={setShowSignIn} />
            )}
          </Card>
        </div>
      )}
    </div>
  )
}

export default SignLayout
