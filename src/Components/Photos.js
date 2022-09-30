// rename to grid or smth

import React from 'react'
import Photo from './Photo'


import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default function Photos(props) {

    console.log('props', props)

    const { photos } = props

    console.log('yo', photos)

    return (


        <div>
            {
                (
                    photos && photos.map((photo, idx) =>
                        <div
                            key={idx}
                        >
                            {/* {photo.src.small} */}
                            {/* componetize this into a photo */}
                            {/* <img src={photo.src.small}></img> */}
                            <Photo src={photo.src.medium} alt={photo.alt} />
                        </div>
                    )
                )

                || <Skeleton />
            }



        </div>
    )
}
