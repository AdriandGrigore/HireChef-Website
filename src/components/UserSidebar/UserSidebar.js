import React, {useEffect, useState} from 'react'
import { NavHashLink as Link } from 'react-router-hash-link'
import { signOut } from 'firebase/auth'
import { auth } from '../../util/firebase-config'
import {BiDownArrowAlt, BiUpArrowAlt} from "react-icons/bi"
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserData } from '../../features/userSlice'
import useAuth from "../../custom-hooks/useAuth"
import { resetState } from '../../features/bookingFormSlice'
import "../../components/UserSidebar/UserSidebar.css"

function UserSidebar() {
    const [logoutError, setLogoutError] = useState("")
    const [openMenu, setOpenMenu] = useState(false)
    const dispatch = useDispatch()
    const {loggedInUser} = useAuth()
    const {editForm} = useSelector(state => state.bookingForm)
    const {loggedInUserData, loggedInUserDataLoading, loggedInUserDataError, userDataFetchedBefore} = useSelector(state => state.users)
    
    const loggedInUserFullName = loggedInUserData
        .map(user => (
            <span className="user-name" key={user.id}>
                {user.firstName} {user.lastName}
            </span> 
        )
    )

    const logout = async () =>{
        try{
            await signOut(auth)
        }
        catch(err){
            setLogoutError("Something went wrong.Try again")
        }
    }
    
    const toggleAccMenu = () =>{
        setOpenMenu(!openMenu)
    }

    useEffect(() => {
        // fetch user data only if it was not fetched before to reduce unnecessary fetching
        if(!userDataFetchedBefore){
            dispatch(fetchUserData(loggedInUser))
        }
    }, [dispatch, loggedInUser, userDataFetchedBefore])

  return (
    <div className='sidebar-container'>
        <button className='my-account-button' onClick={toggleAccMenu}>
            My account {openMenu ? <BiUpArrowAlt/> : <BiDownArrowAlt/>}
        </button>
        <nav className='sidebar-menu' style={openMenu ? {display:"block"} : {display:"none"}}>
            <h3>
                <span className='welcome-span'>Welcome,</span>
                {loggedInUserDataError ? 
                    <span className='user-name'>User</span> :
                    loggedInUserDataLoading ? 
                    <span className='user-name'>Loading...</span> : 
                    loggedInUserFullName
                }
            </h3>
            <ul>
                <li>
                    <Link to="/user/meetings#" onClick={() => setOpenMenu(false)}>Your meetings</Link>
                </li>
                <li>
                    <Link 
                        to="/user/booking#" 
                        onClick={editForm.status ? 
                        () => {
                            setOpenMenu(false)
                            dispatch(resetState())
                        } 
                        :
                        () => setOpenMenu(false)}
                    >
                        Book a meeting
                    </Link>
                </li>
                <li>
                    <Link to="/user/ratings#" onClick={() => setOpenMenu(false)}>Ratings</Link>
                </li>
                <button className='log-out-button' onClick={logout}>Log Out</button>
            </ul>
            {logoutError ? <small className='log-out-error'>{logoutError}</small> : null}
        </nav>
    </div>
  )
}

export default UserSidebar