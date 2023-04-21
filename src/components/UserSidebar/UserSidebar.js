import React, {useState} from 'react'
import { NavHashLink as Link } from 'react-router-hash-link'
import { signOut } from 'firebase/auth'
import { auth } from '../../util/firebase-config'
import { useNavigate } from 'react-router-dom'
import {BiDownArrowAlt, BiUpArrowAlt} from "react-icons/bi"
import "../../components/UserSidebar/UserSidebar.css"

function UserSidebar() {
    const [logoutError, setLogoutError] = useState("")
    const [openMenu, setOpenMenu] = useState(false)
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
    
    const toggleAccMenu = () =>{
        setOpenMenu(!openMenu)
    }

  return (
    <div className='sidebar-container'>
        <button className='my-account-button' onClick={toggleAccMenu}>
            My account {openMenu ? <BiUpArrowAlt/> : <BiDownArrowAlt/>}
        </button>
        <nav className='sidebar-menu' style={openMenu ? {display:"block"} : {display:"none"}}>
            <h3>
                <span>Welcome,</span> 
                <span className='user-name'>Adrian Grigore</span>
            </h3>
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
            {logoutError ? <small className='log-out-error'>{logoutError}</small> : null}
        </nav>
    </div>
  )
}

export default UserSidebar