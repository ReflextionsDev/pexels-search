import { Button, TextField, Stack, Item, Box } from '@mui/material'
import React from 'react'

export default function Header() {
    return (
        <Box display="flex" justifyContent="center" sx={{ p: 2, bgcolor: '#e0edff', boxShadow: 3, }} >
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
            >
                <TextField id="outlined-basic" label="Search" variant="outlined" />
                <Button variant="contained">Search</Button>
                <Button variant="contained">Reset</Button>
            </Stack>
        </Box>
    )
}
