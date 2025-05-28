import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TopBar from './TopBar.jsx'
import SideBar from './SideBar.jsx'
import Products from './products.jsx'
import BottomBar from "./BottomBar.jsx"
import Cart from "./cart.jsx"
import User from "./user.jsx"
import CurProduct from "./CurrentProduct.jsx"
import { AppProvider } from './AppContext';

// Get root container element that wraps all your app or create one in your HTML
const rootElement = document.getElementById('root'); // Make sure your HTML has a <div id="root"></div>

createRoot(rootElement).render(
  <StrictMode>
    <AppProvider>
      <TopBar />
      <SideBar />
      <Products />
      <Cart />
      <CurProduct />
      <BottomBar />
    </AppProvider>
  </StrictMode>
);
