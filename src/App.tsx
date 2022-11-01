import './App.css'
import './screens/FeaturedSearch'
import FeaturedSearch from './screens/FeaturedSearch'

/**
 * The main app function, wrapping all other screens and components
 * This is the entire front end application
 * 
 * @returns Streamability!
 */
function App() {
  return (
    <div className="App">
      <h1>Streamability</h1>
      <FeaturedSearch />
    </div>
  )
}

export default App
