import { Button } from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import { addAge } from '../redux/slices/homeSlice'

const Contact = () => {
  const { users } = useSelector(state => state.myNum)
  const dispatch = useDispatch()
  return (
    <div className='text-center'>
      <h1>users</h1>
      {users.map(({ name, age, id }, index) => (
        <div key={index}>
          <h1>{name}</h1>
          <h1>{age}</h1>
          <Button color='amber' onClick={() => dispatch(addAge(id))}>
            increment age
          </Button>
        </div>
      ))}
    </div>
  )
}

export default Contact
