import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { NavbarDefault } from './components/NavBar'
import Contact from './pages/Contact'
import Users from './pages/Users'
import NewUser from './pages/NewUser'

function App() {
  return (
    <>
      <NavbarDefault />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:userId/name/:userName' element={<NewUser />} />
      </Routes>
    </>
  )
}

export default App
