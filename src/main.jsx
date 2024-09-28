import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import { Provider } from 'react-redux'
// import store, { persistor } from './redux/store.js'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-tailwind/react'
// import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  // <Provider store={store}>
  //   <PersistGate loading={null} persistor={persistor}>
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>
  //   </PersistGate>
  // </Provider>
)
