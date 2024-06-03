import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {customTheme} from "./css/theme/Theme.jsx";
import {ChakraProvider} from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
    <App />
    </ChakraProvider>
  </React.StrictMode>,
)
