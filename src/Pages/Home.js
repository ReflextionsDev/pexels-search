import { Container, Pagination, Box } from '@mui/material'
import { Button, TextField, Stack, Item, } from '@mui/material'
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
    const [query, setQuery] = useState('')
    const [curated, setCurated] = useState(true)
    const [photos, setPhotos] = useState()

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
            {/* <Header /> */}
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

            {/* <Footer /> */}
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