import React from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  logout: () => {},
  login: () => {},
});

export default AuthContext;
