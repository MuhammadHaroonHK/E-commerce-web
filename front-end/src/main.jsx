import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from "./ScrollToTop"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/E-commerce-web">
    <ScrollToTop/>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
