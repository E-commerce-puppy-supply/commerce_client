import { Box, Container, CssBaseline, Typography } from '@mui/material'
import React from 'react'

const Complete = () => {
    return (
        <Box>
            <CssBaseline />
            <Container sx={{marginTop: 10}}>
                <Typography variant='h1'>
                    You order has been submitted! Thanks for shopping with us!
                </Typography>
            </Container>
        </Box>
    )
}

export default Complete