import React, { useState } from 'react'
import { ImageListItem, ImageListItemBar, Link } from '@mui/material';
import Skeleton from 'react-loading-skeleton'

// The photo component hides the image while loading and displays a skelton loader
export default function Photo(props) {

    // Props provided by Photos mapping
    const { src, alt, idx, author, url } = props

    // Controls image visibility
    const [loaded, setLoaded] = useState(false)
    const onLoad = () => {
        setLoaded(true)
    }

    return (
        <ImageListItem key={`ImageListItem-${idx}`} style={{
            height: "30vh",
        }}>

            {/* Image - is hidden if loading */}
            <img
                style={{ display: loaded ? 'block' : 'none' }}
                onLoad={onLoad}
                src={src}
                // src={`${src}?w=248&fit=crop&auto=compress`}
                // srcSet={`${src}?w=248&fit=crop&auto=compress&dpr=2 2x`}
                alt={alt}
                height="30vh"
            />

            {/* Skeleton Loader */}
            {!loaded &&
                <div
                    style={{
                        height: "100%",
                        display: "inline-block",
                        minHeight: "10vh"
                    }}
                >
                    <Skeleton height="100%" />
                </div>
            }

            {/* Image details, hidden if loading */}
            {loaded &&
                <ImageListItemBar
                    title={`${author || ''}`}
                    subtitle=
                    {url &&
                        <Link href={url} color="inherit" target="author">
                            {url.split('@')[1]}
                        </Link>
                    }
                />
            }

        </ImageListItem>
    )
}