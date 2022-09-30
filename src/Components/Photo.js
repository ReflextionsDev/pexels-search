import React from 'react'

export default function Photo(props) {

    const {src, alt} = props

  return (
    <div>
      <img src={src} alt={alt}></img>
    </div>
  )
}
