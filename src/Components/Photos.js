// rename to grid or smth

import React from 'react'

export default function Photos(props) {

    console.log('props', props)

    const { photos } = props

    console.log('yo', photos)
    
    return (

        
        <div>
            {photos && photos.map((photo, idx) =>
                <div
                    key={idx}
                >
                    {/* {photo.src.small} */}
                    {/* componetize this into a photo */}
                    <img src={photo.src.small}></img>
                </div>
            )}



            yeet
        </div>
    )
}
