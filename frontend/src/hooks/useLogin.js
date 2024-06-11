import { useState } from 'react';
import useAuthContext from './useAuthContext';

const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signIn = async (email, password) => {
    setError(null);
    setIsLoading(true);
    const response = await fetch(
      "http://localhost:3500/authentication/signin",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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
      console.log('AuthContext state: ', json);
    }
  };

  return { signIn, isLoading, error };
};

export default useLogin;
