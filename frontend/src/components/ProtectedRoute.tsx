import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store/store";

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};
