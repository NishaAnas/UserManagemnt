import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import Home from './Pages/Home'
import About from './Pages/about'
import Profile from './Pages/Profile'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Header from './Components/Header'
import PrivateRoute from './Components/PrivateRoute'

// Importing Admin pages
import AdminHeader from './Components/Admin/Header'
import AdminDashboard from './Pages/Admin/Dashboard'
import AdminUserList from './Pages/Admin/UserList'
import AdminSignin from './Pages/Admin/Signin';
import AdminSignup from './Pages/Admin/Signup';
import CreateUser from './Pages/Admin/createUser';
import AdminPrivateRoute from './Components/Admin/AdminPrivateRoute'

function App() {
  const location = useLocation();

  // Check if current path is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Conditionally render header based on route */}
      {isAdminRoute ? <AdminHeader /> : <Header />}
      <Routes>
        {/* User routes */}
        <Route  path='/'  element={ <Home /> } />
        <Route  path='/about'  element={ <About /> } />
        <Route element={<PrivateRoute />}>
          <Route  path='/profile'  element={ <Profile /> } />
        </Route>
        <Route  path='/signin'  element={ <Signin /> } />
        <Route  path='/signup'  element={ <Signup /> } />


        {/* Admin routes */}
        <Route path="/admin">
            <Route path="dashboard" element={<AdminDashboard />} />

            <Route element={<AdminPrivateRoute />} >
            <Route path="userlist" element={<AdminUserList />} />
            <Route path="createUser" element={<CreateUser />} />
            </Route>

            <Route path="createUser" element={<CreateUser />}/>
            <Route path="signin" element={<AdminSignin />} />
            <Route path="signup" element={<AdminSignup />} />
          </Route>

      </Routes>

    </>
  )
}

export default App


