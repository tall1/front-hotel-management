import { useState } from 'react';
import AuthContext from './auth-context';
const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logoutHandler = () => {
    sessionStorage.setItem('userId', '');
    setIsLoggedIn(false);
  };
  const loginHandler = async (email, password) => {
    const res = await fetch(
      '/users/verify_email_password?email=' + email + '&password=' + password
    );
    const exists = await res.json();
    if (exists === true) {
      const userId = await fetch('/users/get_id_by_email?email=' + email).then(
        (response) => response.json()
      );
      sessionStorage.setItem('userId', userId);
      setIsLoggedIn(true);
    }
    return exists;
  };

  const authContext = {
    isLoggedIn,
    logout: logoutHandler,
    login: loginHandler,
  };
  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
