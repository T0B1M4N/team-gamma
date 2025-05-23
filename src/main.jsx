import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TopBar from './TopBar.jsx'
import SideBar from './SideBar.jsx'
import Products from './products.jsx'
import BottomBar from "./BottomBar.jsx"
import Cart from "./cart.jsx"

createRoot(document.getElementById('TopBar')).render(
  <StrictMode>
    <TopBar />
  </StrictMode>,
)

createRoot(document.getElementById('cartDiv')).render(
  <StrictMode>
    <Cart />
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