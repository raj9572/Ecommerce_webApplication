import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Hero.scss'
const Hero = () => {
  const navigate = useNavigate()
  return (
    <div className='Hero '>
      <div className="hero-content center">
        <h2 className='heading'>Exclusive print and Artwork</h2>
        <p className="subheading">Exclusive Art Pieces, for the Exclusive</p>
        <button className=' cta btn-primary' onClick={()=>navigate('/category')}>Explore more</button>
      </div>
    </div>
  )
}

export default Hero
