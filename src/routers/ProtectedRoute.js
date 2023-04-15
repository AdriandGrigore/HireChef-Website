import React from 'react'
import useAuth from '../custom-hooks/useAuth'
import Login from '../pages/Login'

function ProtectedRoute({children}) {
    const {currentUser} = useAuth()

    return currentUser ? children : <Login/>
}

export default ProtectedRoute