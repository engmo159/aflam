import { useSelector } from 'react-redux'
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
import { ToastContainer, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const { theme } = useSelector(state => state.themeReducer)
  const { pageLoading } = useSelector(state => state.moviesReducer)
  return (
    <div
      className={`${
        theme === 'dark'
          ? 'bg-black text-white dark'
          : 'bg-[#f5f5f5] text-black'
      } min-h-screen font-sans`}
    >
      <NavBar />
      <ToastContainer
        position='bottom-left'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
        transition={Bounce}
      />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movie' element={<Movies />} />
        <Route path='/:mediaType/:mediaId' element={<MediaDetails />} />
        <Route path='/person/:personId' element={<PersonDetails />} />
        <Route path='/tv' element={<Tv />} />
        <Route path='/search' element={<Search />} />
      </Routes>
      <Footer />
      {!pageLoading && <GoToTop />}
    </div>
  )
}

export default App
