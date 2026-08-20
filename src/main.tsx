import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import App from './App'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <Analytics />
  <SpeedInsights/>
  <App />
  
  </StrictMode>,
)
