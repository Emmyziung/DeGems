import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";


const LoginRoutes = ({children}) => {
      const { currentUser } = useAuthContext();
      
 
    console.log(currentUser)
    return currentUser ? (children) : <Navigate to="/signin" />;
    }

export default LoginRoutes;