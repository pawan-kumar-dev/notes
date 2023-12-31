import { useState } from "react";

import useAuthContext from "./useAuthHooks";

export const useLoginHooks = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const login = async (email, password) => {
    setIsLoading(true);
    setError("");
    const response = await fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      return;
    }
    localStorage.setItem("user", JSON.stringify(json));
    dispatch({ type: "LOGIN", payload: json });
    setIsLoading(false);
  };
  return { login, isLoading, error };
};
