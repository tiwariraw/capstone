import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../rtk/store";
import { useLocation, Navigate } from "react-router-dom";
import toast from "react-hot-toast";

type PrivateRouteProps = {
  children: JSX.Element;
  role?: string;
};

const PrivateRoute: FC<PrivateRouteProps> = ({ children, role }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!user) {
    toast.error("You must be logged in");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && role !== user.role) {
    toast.error("You are not authorized to access this page");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
