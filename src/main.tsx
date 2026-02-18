import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app'
import "./global.css";
import { enableMSW } from './api/mocks';

enableMSW().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
