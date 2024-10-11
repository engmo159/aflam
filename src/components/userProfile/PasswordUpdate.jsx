
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../Loading'
import { useEffect } from 'react'
import { changePageLoading } from '../../redux/slices/moviesSlice'
import { Button, Input, Typography } from '@material-tailwind/react'
import { toast, Bounce } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import {
  changePasswordFunction,
  changePasswordToastStateReset,
} from '../../redux/slices/userAuthSlice'

const PasswordUpdate = () => {
  const dispatch = useDispatch()
  const { pageLoading } = useSelector(state => state.moviesReducer)
  const { changePasswordToastState, updatePasswordErr } = useSelector(
    state => state.userAuthReducer
  )
  const { theme } = useSelector(state => state.themeReducer)
  const { token } = useSelector(state => state.tokenReducer)
  useEffect(() => {
    dispatch(changePageLoading(true))
    return () => dispatch(changePageLoading(false))
  }, [dispatch])

  // YUP validation schema
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Current password is required')
      .min(6, 'Current password must be at least 6 characters'),
    newPassword: Yup.string()
      .required('New password is required')
      .min(6, 'New password must be at least 6 characters'),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm password is required'),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  // Toast notification logic
  const notifySuccess = () => {
    toast.success('Your password has been changed successfully!', {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme,
      transition: Bounce,
      onClose: () => {
        dispatch(changePasswordToastStateReset())
      },
    })
  }
  useEffect(() => {
    dispatch(changePasswordToastStateReset())
  }, [dispatch])

  useEffect(() => {
    if (changePasswordToastState) {
      notifySuccess()
    }
  }, [changePasswordToastState, dispatch])
  const submitHandler = async data => {
    try {
      dispatch(changePasswordFunction({ ...data, token }))
      // console.log({ ...data, token })
    } catch (error) {
      toast.error(error || 'Error changing password. Please try again.')
    }
  }

  if (pageLoading) {
    return <Loading load={''} />
  }

  return (
    <div className='h-screen mx-[5%] pt-[10%] flex flex-col gap-4'>
      {/* title  */}
      <div className='flex flex-col gap-2'>
        <Typography
          variant='h4'
          className='uppercase text-black dark:text-white'
        >
          Update Password
        </Typography>
        <div className='h-1.5 bg-ourRed w-[10%]' />
      </div>
      {/* form  */}
      <form
        className='flex gap-8 flex-col lg:w-1/2'
        onSubmit={handleSubmit(submitHandler)}
      >
        {updatePasswordErr && (
          <p className='text-red-600'>{updatePasswordErr}</p>
        )}
        {/* Current Password */}
        <div>
          <Controller
            name='password'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <Input
                color='teal'
                label='Current Password'
                type='password'
                size='lg'
                error={!!errors?.password}
                className='border outline outline-2 outline-gray-800 border-gray-800 hover:border-white hover:outline-white transition-all'
                {...field}
                aria-label='Current Password'
              />
            )}
          />
          {errors?.password && (
            <p className='text-red-600'>{errors.password.message}</p>
          )}
        </div>
        {/* New Password */}
        <div>
          <Controller
            name='newPassword'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <Input
                color='teal'
                label='New Password'
                type='password'
                size='lg'
                error={!!errors.newPassword}
                className='border outline outline-2 outline-gray-800 border-gray-800 hover:border-white hover:outline-white transition-all'
                {...field}
                aria-label='New Password'
              />
            )}
          />
          {errors.newPassword && (
            <p className='text-red-600'>{errors.newPassword.message}</p>
          )}
        </div>
        {/* Confirm Password */}
        <div>
          <Controller
            name='confirmNewPassword'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <Input
                color='teal'
                label='Confirm Password'
                type='password'
                size='lg'
                error={!!errors.confirmNewPassword}
                className='border outline outline-2 outline-gray-800 border-gray-800 hover:border-white hover:outline-white transition-all'
                {...field}
                aria-label='Confirm Password'
              />
            )}
          />
          {errors.confirmNewPassword && (
            <p className='text-red-600'>{errors.confirmNewPassword.message}</p>
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
            Change Password
          </Button>
        </div>
      </form>
    </div>
  )

}

export default PasswordUpdate
