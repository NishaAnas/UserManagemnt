import { useSelector,useDispatch } from "react-redux";
import { signOut } from '../../redux/user/userSlice'
import { Link, useNavigate } from "react-router-dom";

function Header() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = async()=>{
    try {
        await fetch('/server/admin/auth/adminSignout');
        dispatch(signOut());
        navigate("/admin/signin")
    } catch (error) {
        console.log(error);
    }
  }

  const { isAdmin } = useSelector((state)=>state.user);
    return (
        <div className="bg-slate-200">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
          <Link to="/admin/dashboard">
            <h1 className="font-bold">User Management Admin</h1>
          </Link>
          <ul className="flex gap-4">
            <Link to="/admin/dashboard">
              <li>Dashboard</li>
            </Link>
            <Link to="/admin/userlist">
              {isAdmin && (
                <li>User List</li>
              )}
            </Link>
            {isAdmin ? (
            <li onClick={handleSignOut} className="cursor-pointer">
              Sign-Out
            </li>
          ):(
            <Link to="/admin/signin">
              <li>Sign-In</li>
            </Link>
          )}
          </ul>
        </div>
      </div>
    )
}

export default Header
