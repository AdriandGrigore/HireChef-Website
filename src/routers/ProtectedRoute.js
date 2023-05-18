import React from 'react'
import useAuth from '../custom-hooks/useAuth'
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { loggedInUser, loadingUser } = useAuth();

  if(loadingUser) {
    return <div></div>;
  } else {
    return loggedInUser ? children : <Navigate to = "/login" />;
  }

}

export default ProtectedRoute;
