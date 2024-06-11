import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  
  const signUp = async (email, password, name) => {
    setError(null);
    setIsLoading(true);
    const response = await fetch(
      "http://localhost:3500/authentication/signup",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      }
    );
    const json = await response.json(); //user data

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    } else {
      localStorage.setItem("user", JSON.stringify(json)); // for storing the token inside local cache
      //update authcontext
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      console.log('User signed up successfully:', json);
    }
  };

  return { signUp, isLoading, error };
};

export default useSignup;

