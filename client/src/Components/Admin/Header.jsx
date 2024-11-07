import { Link } from "react-router-dom";

function Header() {
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
              <li>User List</li>
            </Link>
            <Link to="/admin/signin">
                <li>Sign-In</li>
            </Link>
          </ul>
        </div>
      </div>
    )
}

export default Header
