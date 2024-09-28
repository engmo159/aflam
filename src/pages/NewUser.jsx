import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../redux/slices/userSlice'
import { useParams } from 'react-router-dom'

const NewUser = () => {
  const { userInfo } = useSelector(state => state.allUsers)
  const param = useParams()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserDetails(param.userId))
  }, [])
  return (
    <div>
      <h1>NewUser</h1>
      <h1>{userInfo?.name}</h1>
    </div>
  )
}

export default NewUser
