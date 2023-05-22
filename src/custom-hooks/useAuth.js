import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../util/firebase-config';

function useAuth() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        setLoggedInUser(user)
      } else {
        setLoggedInUser(null)
      }
      setLoadingUser(false)
    });

    return () => {
      unsubscribe()
    }

  }, []);

  return {
    loggedInUser,
    loadingUser,
  };
}

export default useAuth;
