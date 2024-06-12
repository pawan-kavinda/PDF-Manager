import { useState } from 'react';
import useAuthContext from './useAuthContext';
import { toast } from 'react-toastify';
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
    const json = await response.json(); 

    if (!response.ok) {
      setIsLoading(false);
      toast.error('An error occurred. Please try again.'); 
      setError(json.error);
    } else {
      localStorage.setItem("user", JSON.stringify(json)); // for storing the token inside local cache
      //update authcontext
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      toast.success("Login successful!");
      console.log('AuthContext state: ', json);
    }
  };

  return { signIn, isLoading, error };
};

export default useLogin;
