  //this custom hook is for better reusability, error handling and encapsulation without directly applying context inside useSignUp hook
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useAuthContext = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }
  return context;
};

export default useAuthContext;
