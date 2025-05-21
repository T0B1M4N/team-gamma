import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SideBar from './SideBar.jsx'

createRoot(document.getElementById('TopBar')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

createRoot(document.getElementById('SideBarDiv')).render(
  <StrictMode>
    <SideBar />
  </StrictMode>,
)