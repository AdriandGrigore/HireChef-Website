import React from 'react'
import Navbar from '../components/Navbar/Navbar.js'
import Hero from '../components/Hero/Hero.js'
import ChefList from '../components/ChefList/ChefList.js'
import Footer from '../components/Footer/Footer.js'
import Instructions from '../components/Instructions/Instructions'
import About from '../components/About/About.js'
import Banner from '../components/Banner/Banner.js'

function Home() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <Banner title="About us" id="about"/>
      <About/>
      <Banner title="Meet our chefs" id="chefs"/>
      <ChefList/>
      <Banner title="How it works"/>
      <Instructions/>
      <Footer/>
    </>
  )
}

export default Home