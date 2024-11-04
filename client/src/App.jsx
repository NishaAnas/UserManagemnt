import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import About from './Pages/about'
import Profile from './Pages/Profile'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'

function App() {

  return (
    <>
      <BrowserRouter >
      <Routes>
        <Route  path='/'  element={ <Home /> } />
        <Route  path='/about'  element={ <About /> } />
        <Route  path='/profile'  element={ <Profile /> } />
        <Route  path='/signin'  element={ <Signin /> } />
        <Route  path='/signup'  element={ <Signup /> } />
      </Routes>
      
    </BrowserRouter>
    </>
  )
}

export default App
