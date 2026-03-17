import { type ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store/store";
import { confirmAction } from  "../utils/alerts";

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      confirmAction({
        title: "Login Required!",
        text: "Please login to continue.",
        icon: "info",
        confirmButtonText: "Login",
        showCancelButton: true,
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/login");
        } else {
          
          navigate("/"); 
        }
      });
    }
  }, [user, navigate]);

  
  if (!user) return null; 

  return <>{children}</>;
};
