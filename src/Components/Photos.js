// rename to grid or smth

import React from 'react'
import Photo from './Photo'

import Button from '@mui/material/Button';
import { ImageList, Container, Link } from '@mui/material';

import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';

// import IconButton from '@mui/material/IconButton';
// import InfoIcon from '@mui/icons-material/Info';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'



export default function Photos(props) {

    console.log('props', props)

    const { photos } = props

    console.log('yo', photos)

    return (


        <div>

            <Button variant="contained">Hello World</Button>

            <Container>


                {
                    (
                        photos
                        &&

                        <ImageList cols={5} >

                            <ImageListItem key="Subheader" cols={5}>
                                <ListSubheader component="div">December</ListSubheader>
                            </ImageListItem>

                            {photos.map((photo, idx) =>

                                <ImageListItem key={idx}>
                                    {/* {photo.src.small} */}
                                    {/* componetize this into a photo */}
                                    {/* <img src={photo.src.small}></img> */}
                                    {/* <Photo src={photo.src.small} alt={photo.alt} /> */}

                                    <img
                                        src={`${photo.src.small}?w=248&fit=crop&auto=format`}
                                        srcSet={`${photo.src.small}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        alt={photo.alt}
                                        loading="lazy"
                                    />

                                    <ImageListItemBar

                                        title={`${photo.photographer}`}
                                        subtitle=<Link href={photo.photographer_url} color="inherit">
                                            {photo.photographer_url.split('@')[1]}

                                        </Link>

                                    // actionIcon={
                                    //     <IconButton
                                    //         sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    //         aria-label={`info about $`}
                                    //     >
                                    //         <InfoIcon />
                                    //     </IconButton>
                                    // }
                                    />

                                </ImageListItem>
                            )
                            }
                        </ImageList>


                    )

                    || <Skeleton />
                }


            </Container>


        </div>
    )
}
