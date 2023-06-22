import { createContext } from "react";

const AuthContext = createContext({
  loggedIn: "未登錄",
  setLoggedIn: () => {},
});

export default AuthContext;