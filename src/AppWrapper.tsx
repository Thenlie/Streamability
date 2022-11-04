import { Outlet } from 'react-router-dom';
import './App.css';

/**
 * The main app function, wrapping all other screens and components
 * This wraps the entire front end application and will be shown on every screen
 * 
 * @returns Streamability!
 */
export default function AppWrapper() {
  return (
    <div className="App">
        <h1>Streamability</h1>
        <div>
            <Outlet />    
        </div>    
    </div>
  )
}
