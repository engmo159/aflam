import { FaArrowUp } from 'react-icons/fa'

const GoToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className='fixed bottom-4 right-4 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition duration-300'
      aria-label='Go to top'
    >
      <FaArrowUp />
    </button>
  )
}
export default GoToTop
