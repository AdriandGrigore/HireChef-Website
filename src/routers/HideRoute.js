import React from 'react'
import useAuth from '../custom-hooks/useAuth'
import { Navigate } from 'react-router-dom';

function HideRoute({ children }) {
  const { loggedInUser, loadingUser } = useAuth();

  if(loadingUser) {
    return <div></div>;
  } else {
    return !loggedInUser ? children : <Navigate to = "/" replace/>
  }
}

export default HideRoute;