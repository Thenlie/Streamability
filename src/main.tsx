import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import PageNotFound from './screens/PageNotFound'

/**
 * Create the 'root route' and serve the entire app to it
 */
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <PageNotFound />,
    }
])

/**
 * This code was added with the Vite boiler plate
 * 
 * @TODO Read documentation on this code, understand it and see if it can be improved/refactored
 * @TODO Update this comment with what this code does, or what the refactored code does
 */
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
