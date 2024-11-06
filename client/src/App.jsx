import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/about'
import Profile from './Pages/Profile'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Header from './Components/Header'
import PrivateRoute from './Components/PrivateRoute'

function App() {

  return (
    <>
      <BrowserRouter >
      <Header />
      <Routes>
        <Route  path='/'  element={ <Home /> } />
        <Route  path='/about'  element={ <About /> } />
        <Route element={<PrivateRoute />}>
          <Route  path='/profile'  element={ <Profile /> } />
        </Route>
        <Route  path='/signin'  element={ <Signin /> } />
        <Route  path='/signup'  element={ <Signup /> } />
      </Routes>
      
    </BrowserRouter>
    </>
  )
}

export default App
