import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../redux/slices/userSlice'
import Loading from '../components/Loading'
import DataNotFound from './DataNotFound'
import { Link } from 'react-router-dom'
import { Button } from '@material-tailwind/react'

const Users = () => {
  const dispatch = useDispatch()
  const { loading, err, users } = useSelector(state => state.allUsers)
  useEffect(() => {
    dispatch(getUsers())
  }, [])
  if (err) {
    return <DataNotFound />
  }
  return (
    <>
      <h1>Users</h1>
      {loading && <Loading />}
      {users?.map(({ username, id }, index) => (
        <div
          key={index}
          className='flex mb-8 justify-evenly items-center gap-8 px-12 bg-blue-gray-700 text-white'
        >
          <h1>Name : {username}</h1>
          <Link to={`/users/${id}/name/${username}`} className='bg-red-600'>
            <Button>Id : {id}</Button>
          </Link>
        </div>
      ))}
    </>
  )
}

export default Users
