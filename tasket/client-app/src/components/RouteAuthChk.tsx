import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthUserContext } from "../app/store/AuthUserContext";

interface Props {
    component: React.ReactNode;
    redirect: string
  }  
  
export const RouteAuthChk = ({component, redirect}: Props) => {
    
  const authUser = useAuthUserContext();    
  
  if (!authUser.user?.username) {
    return <Navigate to={redirect} replace={false} />
  }

  return <>{component}</>;

}