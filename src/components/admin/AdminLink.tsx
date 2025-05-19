
import { Link } from "react-router-dom";

const AdminLink = () => {
  return (
    <div className="text-xs text-gray-400 mt-2">
      <Link to="/admin/login" className="hover:text-gray-600 transition">
        Admin Login
      </Link>
    </div>
  );
};

export default AdminLink;
