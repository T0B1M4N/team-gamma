import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TopBar from './TopBar.jsx'
import SideBar from './SideBar.jsx'
import Products from './products.jsx'
import BottomBar from "./BottomBar.jsx"
import './i18n'

import { CartProvider } from './context/CartContext.jsx'
import { I18nextProvider } from 'react-i18next'
import i18n from "./i18n"



createRoot(document.getElementById('TopBar')).render(
  <StrictMode>
    <TopBar />
  </StrictMode>,
)

createRoot(document.getElementById('SideBarDiv')).render(
  <StrictMode>
    <SideBar />
  </StrictMode>,
)

createRoot(document.getElementById('ProductDiv')).render(
  <StrictMode>
    <Products />
  </StrictMode>,
)

createRoot(document.getElementById('BottomBar')).render(
  <StrictMode>
    <BottomBar />
  </StrictMode>,
)