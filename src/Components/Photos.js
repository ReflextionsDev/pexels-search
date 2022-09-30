// rename to grid or smth

import React from 'react'
import Photo from './Photo'

import Button from '@mui/material/Button';
import { ImageList, Container, Link, useMediaQuery } from '@mui/material';

import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';

import { useTheme } from '@mui/material/styles';

// import IconButton from '@mui/material/IconButton';
// import InfoIcon from '@mui/icons-material/Info';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


function getColumns(sm, md, lg) {
    if (sm) { return 2 }
    else if (md) { return 3 }
    else if (lg) { return 4 }
    else { return 5 }
}

// < 600 - 2, <900 - 3, <1200 - 4, else 5
// https://mui.com/material-ui/customization/breakpoints/

export default function Photos(props) {


    // put into getColumns?
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
  




    console.log('matches?', sm)
    console.log('columns:', getColumns(sm,md,lg))

    let columns = getColumns(sm,md,lg)

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

                        <ImageList cols={columns}  >

                            <ImageListItem key="Subheader" cols={columns}>
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
                                        subtitle=<Link href={photo.photographer_url} color="inherit" target="author">
                                            {photo.photographer_url.split('@')[1]}

                                        </Link>

                              
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
