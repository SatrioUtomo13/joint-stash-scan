
// import isAuthenticated di folder utils
import { ReactNode } from "react";
import { isAuthenticated } from "../utils"
import { Navigate } from "react-router-dom";

interface Props {
    children: ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace/>;
    }
    return children;
}

export default ProtectedRoute