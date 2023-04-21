import React, {useState} from 'react'
import { NavHashLink as Link } from 'react-router-hash-link'
import { signOut } from 'firebase/auth'
import { auth } from '../../util/firebase-config'
import { useNavigate } from 'react-router-dom'
import "../../components/UserSidebar/UserSidebar.css"

function UserSidebar() {
    const [logoutError, setLogoutError] = useState("")
    const navigate = useNavigate()

    const logout = async () =>{
        try{
        await signOut(auth)
        navigate("/login#")
        }
        catch(err){
        setLogoutError("Something went wrong.Try again")
        }
    }
  
  return (
    <div className='sidebar-container'>
        <div className='my-account-text'>
            <h1>My account</h1>
        </div>
        <nav className='sidebar-menu'>
            <h3>Welcome, Adrian Grigore</h3>
            <ul>
                <li>
                    <Link to="/user/meetings#">Your meetings</Link>
                </li>
                <li>
                    <Link to="/user/booking#">Book a meeting</Link>
                </li>
                <li>
                    <Link to="/user/ratings#">Ratings</Link>
                </li>
                <button className='log-out-button' onClick={logout}>Log Out</button>
            </ul>
        </nav>
        {logoutError ? <small className='log-out-error'>{logoutError}</small> : null}
    </div>
  )
}

export default UserSidebar