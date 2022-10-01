import React, { useState, useEffect } from 'react'

import Photo from './Photo'
import { Button, ImageList, Container, ImageListItem, ListSubheader, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// import IconButton from '@mui/material/IconButton';
// import InfoIcon from '@mui/icons-material/Info';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function getColumns(sm, md) {
    if (sm) { return 2 }
    else if (md) { return 3 }
    else { return 5 }
}

// < 600 - 2, <900 - 3, <1200 - 4, else 5
// https://mui.com/material-ui/customization/breakpoints/

export default function Photos(props) {

    // put into getColumns?
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.down('md'));


    // Not workin?
    React.useEffect(() => {
        

        function handleResize() {
            console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
            setColumns(getColumns(sm, md,))

    }
     window.addEventListener('resize', handleResize)
     
});



    console.log('matches?', sm)
    console.log('columns:', getColumns(sm, md, ))

    const [columns, setColumns] = useState(getColumns(sm, md,))



    console.log('props', props)

    const { photos } = props

    console.log('yo', photos)



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
