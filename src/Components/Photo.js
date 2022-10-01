import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { ImageListItem, ImageListItemBar, Link } from '@mui/material';


export default function Photo(props) {

    const [loading, setLoading] = useState(true)
    const { src, alt, idx, author, url } = props

    return (
        <ImageListItem key={idx}>

            {loading &&
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

            <img
                onLoad={() => { setLoading(false) }}
                style={{ display: loading ? 'none' : undefined }}
                src={`${src}?w=248&fit=crop&auto=format`}
                srcSet={`${src}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={alt}
                loading="lazy"
            />

            {!loading &&
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
