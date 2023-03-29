import React from 'react'
import aboutImg from "../../assets/about.png"
import "../About/About.css"

function About() {
    return (
        <section className='about-section'>
            <div className='about-grid-container'>
                <img src={aboutImg} alt="about-us" loading='lazy'/>
                <div className='about-grid-container-text'>
                    <p>
                        HireChef is a platform that helps you to hire a chef for a personal event. We offer a wide range of services to make your event special. Whether you need a private
                        chef for a dinner party, or you want to cater an event, we have you covered. 
                    </p>
                    <p>
                        Simply tell us what you're looking for, and we'll match you with a chef who fits your needs. You can then view their profile, read reviews, and book them for your event.
                        We understand that finding the right chef can be daunting, so we've made it easy for you.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default About