import { useDispatch, useSelector } from 'react-redux'
import NavBar from './components/navbar/NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import Tv from './pages/Tv'
import Search from './pages/Search'
import Footer from './components/Footer'
import GoToTop from './components/GoToTop'
import PersonDetails from './pages/PersonDetails'
import MediaDetails from './pages/MediaDetails'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import { setToken } from './redux/slices/tokenSlice'
import { getUserInfo } from './redux/slices/userAuthSlice'

import 'react-toastify/dist/ReactToastify.css'
import Favorites from './components/userProfile/Favorites'
import Reviews from './components/userProfile/Reviews'
import PasswordUpdate from './components/userProfile/PasswordUpdate'
const App = () => {
  const { theme } = useSelector(state => state.themeReducer)
  const { pageLoading } = useSelector(state => state.moviesReducer)
  const { token } = useSelector(state => state.tokenReducer)
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.userAuthReducer)
  // token handler
  useEffect(() => {
    if (userData?.token) {
      dispatch(setToken(userData.token))
    }
  }, [userData, dispatch])
  useEffect(() => {
    if (token) {
      dispatch(getUserInfo(token))
    }
  }, [token, dispatch])
  return (
    <div
      className={`${
        theme === 'dark'
          ? 'bg-black text-white dark'
          : 'bg-[#f5f5f5] text-black'
      } min-h-screen font-sans`}
    >
      <ToastContainer />
      <NavBar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movie' element={<Movies />} />
        <Route path='/:mediaType/:mediaId' element={<MediaDetails />} />
        <Route path='/person/:personId' element={<PersonDetails />} />
        <Route path='/tv' element={<Tv />} />
        <Route path='/search' element={<Search />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/reviews' element={<Reviews />} />
        <Route path='/password-update' element={<PasswordUpdate />} />
      </Routes>
      <Footer />
      {!pageLoading && <GoToTop />}
    </div>
  )
}

export default App
