import React from 'react'

import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { ImageList, Container, Link, useMediaQuery } from '@mui/material';


export default function Photo(props) {

    const { src, alt, idx, author, url } = props

    return (



        <ImageListItem key={idx}>


            <img
                src={`${src}?w=248&fit=crop&auto=format`}
                srcSet={`${src}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={alt}
                loading="lazy"
            />


            <ImageListItemBar

                title={`${author}`}
                subtitle=<Link href={url} color="inherit" target="author">
                    {url.split('@')[1]}

                </Link>


            />

        </ImageListItem>


    )
}
