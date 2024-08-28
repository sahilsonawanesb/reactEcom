// importing libraries
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';

// for toast notification
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

// for redux
import { Provider } from 'react-redux'
import { store } from "./app/store"

// importing components
import { App } from './components'

// importing method 
import { generateRandomUserId } from './assets/JS'

// importing styles
import './assets/styles/index.css'


const userID = generateRandomUserId();

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  // for redux
  <Provider store={store}>

    {/* for routing */}
    <Router>
      <App userID={userID}/>
    </Router> 

    {/* for notfications */}
    <ToastContainer
      position="top-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnHover
      pauseOnFocusLoss
      theme="light"
    />
    
  </Provider>
  // </React.StrictMode>,
,)
