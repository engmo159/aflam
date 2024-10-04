import { Button, Card, Input, Typography } from '@material-tailwind/react'
import PropTypes from 'prop-types'
const Signin = ({ showSignInModal, setShowSignInModal }) => {
  // sign in overlay function
  const handleOverlayClick = e => {
    if (e.target.id === 'overlay') {
      setShowSignInModal(false)
    }
  }
  return (
    <div>
      {showSignInModal && (
        <div
          id='overlay'
          onClick={handleOverlayClick}
          className='fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center '
        >
          <Card className='w-1/3 p-8 bg-gray-900 flex gap-8'>
            <Typography
              variant='h4'
              className='py-1.5 font-bold text-2xl
             text-white text-center'
            >
              Redux
              <span className='text-red-500'> Movies</span>
            </Typography>
            <form className='flex gap-12  flex-col'>
              <Input
                color='teal'
                label='user name'
                type='text'
                size='lg'
                className='border outline outline-2 outline-gray-600 border-gray-600 hover:border-white hover:outline-white transition-all'
              />
              <Input
                color='teal'
                label='email'
                type='email'
                size='lg'
                className='border outline outline-2 outline-gray-800 border-gray-800 hover:border-white hover:outline-white transition-all'
              />
              <Button color='red' fullWidth className='text-md'>
                Sign In
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}
Signin.propTypes = {
  showSignInModal: PropTypes.bool.isRequired,
  setShowSignInModal: PropTypes.func.isRequired,
}
export default Signin
