
import { Container, Pagination, Box } from '@mui/material'

import React from 'react'

export default function Footer() {
    return (
        <Box display="flex" justifyContent="center">
            <Pagination sx={{ p: 2 }} count={10} color="primary" />
        </Box>
    )
}



