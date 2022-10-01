import React, { useEffect, useState } from 'react'
import { Pagination, Box, Button, TextField, Stack, } from '@mui/material'
import PhotoGrid from '../Components/PhotoGrid'

const api_url = 'http://localhost:3001/pexels'

// Translate curated local storage to boolean
let curatedInit = (localStorage.getItem('curated') === "false") ? false : true

// The photo display page
export default function Home() {

    // Component Vars
    const [page, setPage] = useState(parseInt(localStorage.getItem('page')) || 1)
    const [pageCount, setPageCount] = useState(10)
    const [query, setQuery] = useState(localStorage.getItem('query') || '')
    const [curated, setCurated] = useState(curatedInit)
    const [photos, setPhotos] = useState()

    // Local
    localStorage.setItem('page', page)
    localStorage.setItem('query', query)
    localStorage.setItem('curated', curated)

    // API
    const fetchPhotos = async () => {
        try {
            // Dynamically fetch either a curated or a search query request
            let request = ''
            if (curated) {
                request = `${api_url}/curated/${page}`
            } else {
                request = `${api_url}/search/${query}/${page}`
            }

            // API GET
            const response = await fetch(request, {
                mode: 'cors',
            })
            let JSON = await response.json()

            // THEN
            setPhotos(JSON.payload.photos)
            updatePageCount(JSON.payload.total_results, JSON.payload.per_page)

            // Debug
            // console.log('REQUEST', request)
            // console.log(JSON.payload)

        } catch (error) {
            console.log('fetch error', error)
        }
    }

    // Monitor page and curated variabled to update photos
    useEffect(() => {
        fetchPhotos()
    }, [page, curated])

    // Calc total pages for pagination display
    const updatePageCount = (total, perPage) => {
        const totalPages = Math.ceil(total / perPage)
        setPageCount(totalPages)
    }

    // Button functions
    const btnSearch = () => {
        setCurated(false)
        newRequest()
    }

    const btnReset = () => {
        setCurated(true)
        setQuery('')
        newRequest()
    }

    const newRequest = () => {
        setPage(1)
        fetchPhotos()
    }

    return (
        <div>
            {/* Search bar */}
            <Box display="flex" justifyContent="center" sx={{ p: 2, bgcolor: '#e0edff', boxShadow: 3, }} >
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                    {/* Search query */}
                    <TextField variant="outlined" label="Search"
                        value={query}
                        onChange={(e) => { setQuery(e.target.value) }}
                    />
                    {/* Request w/ search query */}
                    <Button variant="contained"
                        onClick={btnSearch}>
                        Search
                    </Button>
                    {/* Reset request to curated */}
                    <Button variant="contained"
                        onClick={btnReset}>
                        Reset
                    </Button>
                </Stack>
            </Box>

            {/* Photos */}
            <PhotoGrid photos={photos} />

            {/* Pagination */}
            <Box display="flex" justifyContent="center">
                <Pagination sx={{ p: 2 }} color="primary"
                    count={pageCount}
                    page={page}
                    onChange={(e, value) => { setPage(value) }}
                />
            </Box>

            {/* Attribution */}
            <a href="https://www.pexels.com" target="new">Photos provided by Pexels</a>
        </div>
    )
}