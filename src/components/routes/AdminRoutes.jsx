import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";

function AdminRoutes({ children }) {
  const { isAdmin } = useAuthContext();

console.log('admin');

  return isAdmin ? children : <Navigate to="/member-dashboard" />;
}

export default AdminRoutes;