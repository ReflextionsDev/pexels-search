import { Pagination, Box, Button, TextField, Stack, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Photos from '../Components/Photos'

const domain = 'http://localhost:3000'

export default function Home() {

    // Component Vars
    const [page, setPage] = useState(parseInt(localStorage.getItem('page')) || 1)
    const [pageCount, setPageCount] = useState(10)
    const [query, setQuery] = useState(localStorage.getItem('query') || '')
    const [curated, setCurated] = useState(JSON.parse(localStorage.getItem("curated")) || true)
    const [photos, setPhotos] = useState()

    // Local
    localStorage.setItem('curated', curated);
    localStorage.setItem('page', page);
    localStorage.setItem('query', query);

    // Dynamically fetch either curated or a search query
    const fetchPhotos = async () => {
        try {
            let request = ''

            if (curated) {
                request = `${domain}/pexels/curated/${page}`
            } else {
                request = `${domain}/pexels/search/${query}/${page}`
            }

            const response = await fetch(request, {})
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
    }, [page])

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
        newRequest()
    }

    const newRequest = () => {
        setPage(1)
        fetchPhotos()
    }

    return (
        <div>
  
  
            <Box display="flex" justifyContent="center" sx={{ p: 2, bgcolor: '#e0edff', boxShadow: 3, }} >
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                    <TextField variant="outlined" label="Search"
                        value={query}
                        onChange={(e) => { setQuery(e.target.value) }}
                    />
                    <Button
                        variant="contained"
                        onClick={btnSearch}
                    >Search</Button>
                    <Button variant="contained"
                        onClick={btnReset}>Reset</Button>
                </Stack>
            </Box>

            <Photos photos={photos} />




            <Box display="flex" justifyContent="center">
                <Pagination sx={{ p: 2 }} color="primary"
                    count={pageCount}
                    // onChange={changePage}
                    page={page}
                    onChange={(e, value) => { setPage(value) }}
                />
            </Box>

        </div>
    )
}