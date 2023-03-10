import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import GlobalState from './components/contexts/GlobalState'
//import "normalize.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalState>
      <HashRouter>
        <App />
      </HashRouter>
    </GlobalState>
  </React.StrictMode>,
)
