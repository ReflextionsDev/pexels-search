import React, { useState } from 'react'
import { ImageList, Container, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Photo from './Photo'

// Adjust ImageList columns based on MUI breakpoints
function getColumns(sm, md) {
    if (sm) { return 2 }
    else if (md) { return 3 }
    else { return 5 }
}

// Photos manages a responsive MUI ImageList, populating when loaded or displaying a skeleton loader 
export default function PhotoGrid(props) {

    // Breakpoint Queries
    const theme = useTheme()
    const sm = useMediaQuery(theme.breakpoints.down('sm'))
    const md = useMediaQuery(theme.breakpoints.down('md'))

    // Component Vars
    const [columns, setColumns] = useState(getColumns(sm, md,))
    const { photos } = props

    // Update Column on window resize
    React.useEffect(() => {
        function onResize() {
            setColumns(getColumns(sm, md,))
        }
        window.addEventListener('resize', onResize)
    })

    // Populate photo components, or display a skeleton loader
    return (
        <Container>
            {(photos &&
                <ImageList cols={columns} variant="quilted"  >

                    {photos.map((photo, idx) => {
                        const props = {
                            src: photo.src.medium,
                            alt: photo.alt,
                            idx: idx,
                            author: photo.photographer,
                            url: photo.photographer_url,
                        }
                        return <Photo {...props} key={`Photo-${idx}`} />
                    })}
                </ImageList>

            ) ||
                <div
                    style={{
                        height: "80vh",
                    }}
                >
                    <Skeleton height="100%" />
                </div>
            }
        </Container>
    )
}