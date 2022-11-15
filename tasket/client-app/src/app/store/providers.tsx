import React from "react";
import { AuthUserProvider } from "./AuthUserContext";
import { TaskProvider } from "./TaskContext";

type Props = {
  children: React.ReactNode
}
export const Providers:React.FC<Props> = (props) => {
  return (
    <>
      <AuthUserProvider>
        <TaskProvider>
            {props.children}
        </TaskProvider>        
      </AuthUserProvider>
    </>
  );
}