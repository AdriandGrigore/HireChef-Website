import React from 'react'
import HeroImage from "../../assets/hero.jpg"
import "../Hero/Hero.css"

function Hero() { 
  return (
    <section>
        <div className='hero-container'>
          <img src={HeroImage} loading="lazy" alt="heroImage"/>
        </div>
        <div className='hero-text-container'>
            <h1>Planning an important event?</h1>
            <h2>Hire one of our chefs!</h2>
            <a href="#chefs">Our chefs</a>
        </div>
    </section>
  )
}

export default Hero