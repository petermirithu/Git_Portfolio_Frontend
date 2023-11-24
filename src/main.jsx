import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import Store from './redux/Store.js'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
      <ThemeProvider theme={defaultTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
