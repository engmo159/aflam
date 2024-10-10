/* eslint-disable react/prop-types */
import { Button, Input } from '@material-tailwind/react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import {

  signInFunction,
  signInToastStateReset,
  signUpToastStateReset,
  switchShowSignInModal,
} from '../../redux/slices/userAuthSlice'
import { toast, Bounce } from 'react-toastify'
import { useEffect } from 'react'

const SignIn = ({ setShowSignIn }) => {
  const dispatch = useDispatch()
  const { signInErr, signInLoading, signInToastState } = useSelector(
    state => state.userAuthReducer
  )
  const { theme } = useSelector(state => state.themeReducer)

  // Toast notification logic
  const notifySuccess = () => {
    toast.success('🦄 You Logged In Successfully!', {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme,
      transition: Bounce,
      onClose: () => {
        dispatch(signInToastStateReset())

      },
    })
  }

  useEffect(() => {

    dispatch(signInToastStateReset())
    dispatch(signUpToastStateReset())
  }, [dispatch])

  useEffect(() => {
    if (signInToastState) {
      notifySuccess()
      dispatch(switchShowSignInModal())

    }
  }, [signInToastState, dispatch])

  // YUP validation schema
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const submitHandler = data => {
    dispatch(signInFunction(data))
  }

  return (
    <form
      className='flex gap-8 flex-col'
      onSubmit={handleSubmit(submitHandler)}
    >
      {signInErr && <p className='text-red-600'>{signInErr}</p>}
      {/* Username */}
      <div>
        <Controller
          name='username'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <Input
              color='teal'
              label='Username'
              type='text'
              size='lg'
              error={errors?.username}
              className='border outline outline-2 outline-gray-800 border-gray-800 hover:border-white hover:outline-white transition-all'
              {...field}
              aria-label='Username'
            />
          )}
        />
        {errors.username && (
          <p className='text-red-600'>{errors.username.message}</p>
        )}
      </div>
      {/* Password */}
      <div>
        <Controller
          name='password'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <Input
              color='teal'
              label='Password'
              type='password'
              size='lg'
              error={errors.password}
              className='border outline outline-2 outline-gray-800 border-gray-800 hover:border-white hover:outline-white transition-all'
              {...field}
              aria-label='Password'
            />
          )}
        />
        {errors.password && (
          <p className='text-red-600'>{errors.password.message}</p>
        )}
      </div>
      <div className='flex flex-col gap-2'>
        <Button
          color='red'
          fullWidth
          className='text-md'
          size='sm'
          type='submit'
        >
          {signInLoading ? <span className='btnLoader'></span> : 'Sign In'}
        </Button>
        <Button
          color='red'
          fullWidth
          className='text-md'
          variant='text'
          size='sm'
          onClick={() => setShowSignIn(false)}
        >
          Sign Up
        </Button>
      </div>
    </form>
  )
}

export default SignIn
