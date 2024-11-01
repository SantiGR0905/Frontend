// ProtectedRoute.js
import { useAuth } from "../Services/AuthContext.jsx";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children, requiredUserType, requiredPermission }) => {
    const { userTypeId, permissionId } = useAuth();

    console.log(userTypeId);
    console.log(permissionId)
    if (userTypeId !== requiredUserType || permissionId !== requiredPermission) {
        return <Navigate to="/" replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;
