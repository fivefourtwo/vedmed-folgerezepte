import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.jsx'

// Opt-out für eigene Besuche: einmal ?tracking=aus aufrufen, gilt dann
// dauerhaft für diesen Browser (localStorage). ?tracking=an hebt es auf.
const params = new URLSearchParams(window.location.search)
if (params.get('tracking') === 'aus') localStorage.setItem('va-disable', '1')
if (params.get('tracking') === 'an') localStorage.removeItem('va-disable')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Analytics
      beforeSend={(event) =>
        localStorage.getItem('va-disable') ? null : event
      }
    />
  </StrictMode>,
)
