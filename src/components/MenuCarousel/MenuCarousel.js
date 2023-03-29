import React,{useState}from 'react'
import "../MenuCarousel/MenuCarousel.css"
import menu1 from "../../assets/menu1.jpg"
import menu2 from "../../assets/menu2.jpg"
import menu3 from "../../assets/menu3.jpg"
import {IoMdArrowDroprightCircle, IoMdArrowDropleftCircle,IoMdDownload} from "react-icons/io"

const images=[
{
  id:1,
  src: menu1,
},
{
  id:2,
  src: menu2,
},
{
  id:3,
  src: menu3,
},
]

function MenuCarousel() {
  const [currentIndex, setCurrentIndex]=useState(0)
  const goNextImage=()=>{
    if(currentIndex<images.length-1){
      setCurrentIndex(prevIndex=>prevIndex+1)
    }else{
      setCurrentIndex(0)
    }
  }
  const goPrevImage=()=>{
    if(currentIndex<1){
      setCurrentIndex(images.length-1)
    }else{
      setCurrentIndex(prevIndex=>prevIndex-1)
    }
  }
  return (
    <div className='menu-section'>
      <div className='menu-description'>
        <h1>Our preset menus</h1>
        <p>
          Indulge in a culinary delight with our mouthwatering menus!
          From sumptuous starters to delectable entrees, we have something for every palate.
          With the freshest ingredients and innovative cooking techniques, our skilled chefs create dishes that are sure to tantalize your taste buds.
        </p>
      </div>
      <div className='download-link'>   {/* this is showing only on 450px width or less */}
        <a href={menu1} download> <IoMdDownload/> Download menus</a>
      </div>
      <div className='menu-carousel'>
        <button onClick={goPrevImage}><IoMdArrowDropleftCircle /></button>
        {images.map((image, index) =>
          <img
            key={image.id}
            src={image.src}
            alt="carouselImage"
            className={currentIndex === index ? "carousel-image" : "carousel-image disabled"}
          />
        )}
        <button onClick={goNextImage}><IoMdArrowDroprightCircle /></button>
      </div>
    </div>
  )
}

export default MenuCarousel