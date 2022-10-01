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

const domain = 'http://localhost:3000'


// Will need to adjust later based on cache
// Fetch curated on load

export default function Home() {



    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(10)
    
    const [query, setQuery] = ('')

    const [photos, setPhotos] = useState()

    const [curated, setCurated] = useState(true)

    const changePage = (event, value) => {
        console.log(value)
        setPage(value)
        console.log(page)
    }


   

    const fetchPhotos = async () => {
        try {

            let request = ''

            if (curated) {
                request = `${domain}/pexels/curated/${page}`
            } else {
                request = `${domain}/pexels/search/${query}/${page}`
            }

            console.log('REQUEST', request)

            const response = await fetch(request, {})
            let JSON = await response.json()
            setPhotos(JSON.payload.photos)

            console.log(JSON.payload)
            // console.log('photos:', photos)

            updatePageCount(JSON.payload.total_results, JSON.payload.per_page)


        } catch (error) {
            console.log('fetch error', error)
        }
    }



    const updatePageCount = (total, perPage) => {
        console.log(total, perPage)
        const totalPages = Math.ceil(total / perPage)
        setPageCount(totalPages)
    }



    useEffect(() => {
        fetchPhotos()
    }, [page])


    return (
        <div>
            <Header />
            <Photos photos={photos} />
            {/* <Footer /> */}
            <Box display="flex" justifyContent="center">
                <Pagination sx={{ p: 2 }} count={pageCount} color="primary" onChange={changePage} />
            </Box>
        </div>
    )
}