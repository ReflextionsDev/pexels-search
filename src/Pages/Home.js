// Need cookies to store session > page number, and search query, if no query default to curated
// Test case, load curated on startup
// Implement loading skeleton
// Implement MUI
// Scaffold layout
// Add features

import { Container, Pagination, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import Photos from '../Components/Photos'


// Will need to adjust later based on cache
// Fetch curated on load

export default function Home() {

    const [photos, setPhotos] = useState()

    const fetchCurated = async () => {
        try {
            const response = await fetch('http://localhost:3000/pexels/curated/1', {})
            let JSON = await response.json()
            setPhotos(JSON.payload.photos)

            // console.log(JSON.payload.photos)
            // console.log('photos:', photos)
        } catch (error) {
            console.log('fetch error', error)
        }
    }


    useEffect(() => {
        fetchCurated()
    }, [])


    return (
        <div>
            <Header />
            <Photos photos={photos} />
            <Footer />
        </div>
    )
}