import { Navigate, Outlet } from "react-router-dom";
import type { ProfileResponse } from "../interfaces/User";

const ProtectedRoute = ({ user }: { user: ProfileResponse | null }) => {
  if (!user || !user.roles.some(role => role.roleDef === "ADMIN")) {
    return <Navigate to={"/unauthorized"} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
