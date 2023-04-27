import React from 'react'
import useAuth from '../custom-hooks/useAuth'
import Login from '../pages/Login'

function ProtectedRoute({children}) {
    const {loggedInUser} = useAuth()

    return loggedInUser ? children : <Login/>
}

export default ProtectedRoute