import { Button, Input } from '@material-tailwind/react'
import PropTypes from 'prop-types'

const SignUp = ({ setShowSignIn }) => {
  return (
    <form className='flex gap-8 flex-col'>
      <Input
        color='teal'
        label='Display Name'
        type='text'
        size='lg'
        className='border outline outline-2 outline-gray-800 border-gray-800 hover:border-white hover:outline-white transition-all'
      />
      <Input
        color='teal'
        label='email'
        type='email'
        size='lg'
        className='border outline outline-2 outline-gray-800 border-gray-800 hover:border-white hover:outline-white transition-all'
      />
      <Input
        color='teal'
        label='password'
        type='password'
        size='lg'
        className='border outline outline-2 outline-gray-800 border-gray-800 hover:border-white hover:outline-white transition-all'
      />
      <Input
        color='teal'
        label='Confirm Password'
        type='password'
        size='lg'
        className='border outline outline-2 outline-gray-800 border-gray-800 hover:border-white hover:outline-white transition-all'
      />
      <div className='flex flex-col gap-2'>
        <Button color='red' fullWidth className='text-md' size='sm'>
          Sign Up
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
  )
}
SignUp.propTypes = {
  setShowSignIn: PropTypes.function,
}
export default SignUp
