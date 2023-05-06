import React, {useEffect, useState} from 'react'
import logo from "../../assets/logo.png"
import {CiHome,CiCircleInfo,CiBookmark,CiUser} from "react-icons/ci"
import {RxHamburgerMenu} from "react-icons/rx"
import {AiOutlineClose,AiOutlineLogin} from "react-icons/ai"
import {MdOutlineRestaurantMenu} from "react-icons/md"
import { NavHashLink as Link } from 'react-router-hash-link'
import useAuth from '../../custom-hooks/useAuth'
import { useDispatch, useSelector } from 'react-redux'
import { resetForm } from '../../features/bookingFormSlice'
import "../Navbar/Navbar.css"

function Navbar() {
  const [hamburgerMenu, setHamburgerMenu]=useState(false)
  const [scrollPosition,setScrollPosition]=useState({position:0, prevPosition:0})
  const {editForm} = useSelector(state => state.bookingForm) 
  const isNavbarVisible = scrollPosition.position<=scrollPosition.prevPosition
  const {loggedInUser} = useAuth()
  const dispatch = useDispatch()
  
  useEffect(() => {
    const onScroll = () => {
      setScrollPosition(prevState => {
        return { position: window.scrollY, prevPosition: prevState.position }
      })
    }
    window.addEventListener("scroll", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  const closeHamburgerMenu = () =>{
    setHamburgerMenu(false)
  }
  
  const closeHamburgerMenuAndEditForm = () => {
    setHamburgerMenu(false)
    if(editForm.status){
      dispatch(resetForm())
    }
  }

  return (
    <nav className={ isNavbarVisible ? "navbar" : "navbar navbar-hidden"}>
      <div className="navbar-logo-container">
        <Link onClick={closeHamburgerMenu} to="/#"> <img src={logo} alt="logo"/> </Link>
      </div>
      <div onClick={()=>setHamburgerMenu(!hamburgerMenu)} className="burger-menu">
       {hamburgerMenu ? <AiOutlineClose/> : <RxHamburgerMenu/>}
      </div>
      <ul className={hamburgerMenu && isNavbarVisible ? "navbar-menu mobile" : "navbar-menu"}>
        <li>
         <Link onClick={closeHamburgerMenu} to="/#"><CiHome/> Home</Link>
        </li>
        <li>
          <Link onClick={closeHamburgerMenu} to="/#about"><CiCircleInfo/> About</Link>
        </li>
        <li>
          <Link onClick={closeHamburgerMenu} to="/menu#"><MdOutlineRestaurantMenu/> Menu</Link>
        </li>
        <li>
          <Link onClick={closeHamburgerMenuAndEditForm} to={loggedInUser ? "/user/booking#" : "/login#"}><CiBookmark/>Book meeting</Link>
        </li>
        <li>
          {
            loggedInUser ?
            <Link onClick={closeHamburgerMenu} to="/user/meetings#"><CiUser/> Profile </Link> 
            :
            <Link onClick={closeHamburgerMenu} to="/login#"><AiOutlineLogin/> Log in </Link> 
          }
        </li>
      </ul>
    </nav>
  )
}

export default Navbar