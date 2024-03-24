import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {InputChartProvider} from './context/InputChartProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <InputChartProvider>
  <App />
  </InputChartProvider>

   
   
  </React.StrictMode>,
)
