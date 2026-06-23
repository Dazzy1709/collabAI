import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./src/frontend/styles/index.css"
import App from './src/frontend/App'
import {BrowserRouter} from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter >
  </StrictMode>,
)
