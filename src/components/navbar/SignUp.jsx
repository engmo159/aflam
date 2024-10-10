/* eslint-disable react/prop-types */
import { Button, Input } from '@material-tailwind/react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import {
  signUpFunction,
  switchShowSignInModal,
  signUpToastStateReset,
} from '../../redux/slices/userAuthSlice'
import { toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'

const SignUp = ({ setShowSignIn }) => {
  const dispatch = useDispatch()
  const { signUpErr, signUpLoading, signUpToastState } = useSelector(
    state => state.userAuthReducer
  )
  const { theme } = useSelector(state => state.themeReducer)
  // toast logic
  const notifySuccess = () => {
    toast.success('🦄 You Signed Up Successfully!', {
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

        dispatch(signUpToastStateReset())
      },
    })
  }
  useEffect(() => {
    dispatch(signUpToastStateReset())
  }, [])
  useEffect(() => {
    if (signUpToastState) {
      notifySuccess()

      dispatch(switchShowSignInModal())

    }
  }, [signUpToastState, dispatch])

  // YUP validation schema
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters'),
    displayName: Yup.string()
      .required('Display name is required')
      .min(4, 'Display name must be at least 4 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const submitHandler = data => {
    dispatch(signUpFunction(data))
  }

  return (
    <>
      <form
        className='flex gap-8 flex-col'
        onSubmit={handleSubmit(submitHandler)}
      >
        {signUpErr && <p className='text-red-600'>{signUpErr}</p>}
        {/* user name  */}
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
              />
            )}
          />
          {errors.username && (
            <p className='text-red-600'>{errors?.username.message}</p>
          )}
        </div>
        {/* display name  */}
        <div>
          <Controller
            name='displayName'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <Input
                color='teal'
                label='Display Name'
                type='text'
                size='lg'
                error={errors.displayName}
                className='border outline outline-2 outline-gray-800 border-gray-800 hover:border-white hover:outline-white transition-all'
                {...field}
              />
            )}
          />
          {errors.displayName && (
            <p className='text-red-600'>{errors?.displayName.message}</p>
          )}
        </div>
        {/* password */}
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
              />
            )}
          />
          {errors.password && (
            <p className='text-red-600'>{errors?.password.message}</p>
          )}
        </div>
        {/* confirm password  */}
        <div>
          <Controller
            name='confirmPassword'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <Input
                color='teal'
                label='Confirm Password'
                type='password'
                size='lg'
                error={errors?.confirmPassword}
                className='border outline outline-2 outline-gray-800 border-gray-800 hover:border-white hover:outline-white transition-all'
                {...field}
              />
            )}
          />
          {errors.confirmPassword && (
            <p className='text-red-600'>{errors?.confirmPassword.message}</p>
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
            {signUpLoading ? <span className='btnLoader'></span> : 'Sign Up'}
          </Button>
          <Button
            color='red'
            fullWidth
            className='text-md'
            variant='text'
            size='sm'
            onClick={() => setShowSignIn(true)}
          >
            Sign In
          </Button>
        </div>
      </form>
    </>
  )
}

export default SignUp
