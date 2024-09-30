import { useSelector } from 'react-redux'

const App = () => {
  const { theme } = useSelector(state => state.themeReducer)
  return (
    <div
      className={`${
        theme === 'dark'
          ? 'bg-blue-gray-900 text-white dark'
          : 'bg-white text-black'
      } min-h-screen font-sans`}
    >
      <h1 className=''>App</h1>
    </div>
  )
}

export default App
