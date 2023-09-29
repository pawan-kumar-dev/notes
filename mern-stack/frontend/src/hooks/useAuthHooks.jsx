import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const useAuthHooks = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("Something went wrong");
  }
  return context;
};

export default useAuthHooks;
