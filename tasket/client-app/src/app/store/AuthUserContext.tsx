import React from "react";
import { UserInfo } from "../models/Account";

export type AuthUserContextType = {
  user: UserInfo | null;
  signin: (user:UserInfo) => void;
  signout: () => void;
}
const AuthUserContext = React.createContext<AuthUserContextType>({} as AuthUserContextType);

export const useAuthUserContext = ():AuthUserContextType => {
  return React.useContext<AuthUserContextType>(AuthUserContext);
}

type Props = {
  children: React.ReactNode
}

export const AuthUserProvider = (props:Props) => {
  const [user, setUser] = React.useState<UserInfo | null>(null);

  const signin = (newUser: UserInfo) => {
    setUser(newUser);
  }

  const signout = () => {
    setUser(null);
  }


  const value:AuthUserContextType = { user, signin, signout };
  
  return (
    <AuthUserContext.Provider value={value}>
      {props.children}
    </AuthUserContext.Provider>
  );
}