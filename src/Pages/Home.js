// Need cookies to store session > page number, and search query, if no query default to curated
// Test case, load curated on startup
// Implement loading skeleton
// Implement MUI
// Scaffold layout
// Add features

import React, { useEffect, useState } from 'react'
import Photos from '../Components/Photos'


// Will need to adjust later based on cache
// Fetch curated on load


export default function Home() {

    const dummyPhotos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const [photos, setPhotos] = useState()


    const fetchCurated = async () => {
        console.log('hello')

        const response = await fetch('http://localhost:3000/pexels/curated/1', {
        })

        let JSON = await response.json()
        console.log(JSON.payload.photos)

        setPhotos(JSON.payload.photos)
        console.log('photos:', photos)


    }


    useEffect(() => {
        fetchCurated()
    }, [])


    return (
        <div>
            Home
            <Photos photos={photos} />
        </div>
    )
}
