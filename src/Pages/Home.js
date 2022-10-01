import React, { useEffect, useState } from 'react'
import { Pagination, Box, Button, TextField, Stack, } from '@mui/material'
import Photos from '../Components/Photos'

const api_url = 'http://localhost:3001/pexels'

export default function Home() {

    // Component Vars
    const [page, setPage] = useState(parseInt(localStorage.getItem('page')) || 1)
    const [pageCount, setPageCount] = useState(10)
    // const [query, setQuery] = useState(localStorage.getItem('query') || '')
    const [query, setQuery] = useState('')
    const [curated, setCurated] = useState(true)
    const [photos, setPhotos] = useState()

    // Local
    localStorage.setItem('page', page);
    // localStorage.setItem('query', query);

    // Dynamically fetch either curated or a search query
    const fetchPhotos = async () => {
        try {

            let request = ''

            if (curated) {
                request = `${api_url}/curated/${page}`
            } else {
                request = `${api_url}/search/${query}/${page}`
            }

            const response = await fetch(request, {
                mode: 'cors',
            })
            let JSON = await response.json()

            setPhotos(JSON.payload.photos)
            updatePageCount(JSON.payload.total_results, JSON.payload.per_page)

            // console.log('REQUEST', request)
            // console.log(JSON.payload)
        } catch (error) {
            console.log('fetch error', error)
        }
    }

    // Refetch photos on page update
    useEffect(() => {
        fetchPhotos()
    }, [page, curated])

    // Calc total pages
    const updatePageCount = (total, perPage) => {
        const totalPages = Math.ceil(total / perPage)
        setPageCount(totalPages)
    }

    // Buttons
    const btnSearch = () => {
        setCurated(false)
        newRequest()
    }

    const btnReset = () => {
        setCurated(true)
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
            <Photos photos={photos} />

            {/* Pagination */}
            <Box display="flex" justifyContent="center">
                <Pagination sx={{ p: 2 }} color="primary"
                    count={pageCount}
                    page={page}
                    onChange={(e, value) => { setPage(value) }}
                />
            </Box>
        </div>
    )
}