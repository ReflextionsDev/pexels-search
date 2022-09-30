import React from 'react'

export default function Photo(props) {

    const { src, alt } = props

    return (

        <img
            src={`${src}?w=248&fit=crop&auto=format`}
            srcSet={`${src}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={alt}
            loading="lazy"
        />

    )
}
