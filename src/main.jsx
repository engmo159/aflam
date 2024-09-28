import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-tailwind/react'

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
