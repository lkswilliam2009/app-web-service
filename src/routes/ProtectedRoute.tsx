import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/auth2/login" replace />;
}