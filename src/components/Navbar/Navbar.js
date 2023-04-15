import React, {useEffect, useState} from 'react'
import logo from "../../assets/logo.png"
import {CiHome,CiCircleInfo,CiBookmark,CiUser} from "react-icons/ci"
import {RxHamburgerMenu} from "react-icons/rx"
import {AiOutlineClose,AiOutlineLogin} from "react-icons/ai"
import {MdOutlineRestaurantMenu} from "react-icons/md"
import { NavHashLink as Link } from 'react-router-hash-link'
import useAuth from '../../custom-hooks/useAuth'
import "../Navbar/Navbar.css"

function Navbar() {
  const [clicked, setClicked]=useState(false)
  const [scrollPosition,setScrollPosition]=useState({position:0, prevPosition:0})
  const isVisible= scrollPosition.position<=scrollPosition.prevPosition
  const {currentUser} = useAuth()
  
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
  
  return (
    <nav className={isVisible? "navbar" : "navbar navbar-hidden"}>
      <div className="navbar-logo-container">
        <Link to="/#"><img src={logo} alt="logo"/></Link>
      </div>
      <div onClick={()=>setClicked(!clicked)} className="burger-menu">
       {clicked?<AiOutlineClose/>:<RxHamburgerMenu/>}
      </div>
      <ul className={clicked && isVisible?"navbar-menu mobile":"navbar-menu"}>
        <li>
         <Link onClick={()=>setClicked(false)} to="/#"><CiHome/> Home</Link>
        </li>
        <li>
          <Link onClick={()=>setClicked(false)} to="/#about"><CiCircleInfo/> About</Link>
        </li>
        <li>
          <Link onClick={()=>setClicked(false)} to="/menu#"><MdOutlineRestaurantMenu/> Menu</Link>
        </li>
        <li>
          <Link onClick={()=>setClicked(false)} to={currentUser ? "/booking#" : "/login#"}><CiBookmark/>Book meeting</Link>
        </li>
        <li>
          {
            currentUser ?
            <Link onClick={()=>setClicked(false)} to="/user#"><CiUser/> Profile </Link> 
            :
            <Link onClick={()=>setClicked(false)} to="/login#"><AiOutlineLogin/> Log in </Link> 
          }
        </li>
      </ul>
    </nav>
  )
}

export default Navbar