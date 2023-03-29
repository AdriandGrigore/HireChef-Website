import React from 'react'
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"
import MenuCarousel from '../components/MenuCarousel/MenuCarousel'

function Menu() {
  return (
    <>
      <Navbar/>
      <MenuCarousel/>
      <Footer/>
    </> 
  )
}

export default Menu