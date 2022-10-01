import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { ImageListItem, ImageListItemBar, Link } from '@mui/material';


export default function Photo(props) {

    const [loaded, setLoaded] = useState(false)
    const { src, alt, idx, author, url } = props

    const onLoad = () => {
        setLoaded(true)
    }

    return (
        <ImageListItem key={`ImageListItem-${idx}`} style={{
            height: "30vh",
        }}>

            <img
                style={{ display: loaded ? 'block' : 'none' }}
                onLoad={onLoad}
                src={src}
                // src={`${src}?w=248&fit=crop&auto=compress`}
                // srcSet={`${src}?w=248&fit=crop&auto=compress&dpr=2 2x`}
                alt={alt}
                height="30vh"
            />

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
