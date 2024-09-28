import { Button } from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import { increment } from '../redux/slices/homeSlice'
import { login, logout } from '../redux/slices/persistSlice'

const Home = () => {
  const { num } = useSelector(state => state.myNum)
  const { userName } = useSelector(state => state.persist)
  const dispatch = useDispatch()
  return (
    <div className='mx-auto text-center'>
      <h1>{num}</h1>
      <h1>{num}</h1>
      <h1>{num}</h1>
      <Button onClick={() => dispatch(increment(8))}>+</Button>
      <h1>{userName}</h1>
      <Button onClick={() => dispatch(login())}>LogIn</Button>
      <Button onClick={() => dispatch(logout())}>LogOut</Button>
    </div>
  )
}

export default Home
