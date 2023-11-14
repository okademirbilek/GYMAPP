import React from "react"

import { useState } from "react"

const SliderItem = ({ movie }) => {
  const [isShown, setIsShown] = useState(false)
  const styles = isShown
    ? {
        boxShadow: "0px 0px 30px 0px white",
        opacity: 0.6,
        transform: "scale(1.1)",
      }
    : {}

  return (
    <div className="carousel-container">
      <img className="carousel-img" style={styles} src={movie.img}></img>
      <h6 className="movie-year">{movie.year}</h6>
      <h6 className="movie-star">9.7</h6>
    </div>
  )
}

export default SliderItem
