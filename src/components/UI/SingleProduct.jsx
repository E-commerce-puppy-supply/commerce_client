import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, CssBaseline, Stack, Typography, Button } from '@mui/material'
import Box from '@mui/material/Box'


const SingleProduct = () => {
    const [product, setProduct] = useState({});
    const { id } = useParams();




    useEffect(() => {
        const getProduct = async () => {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`)
            const data = await response.json();
            setProduct(data)
            console.log(data)
        }
        getProduct();
    }, [])

    return (
        <Box>
            <CssBaseline />
            <Stack direction="row" spacing={2}>

                <Box>
                    <Container>

                        <img src={product.image}
                            width="400"
                            height="auto"
                        />
                    </Container>
                </Box>
                <Box>
                    <Container>
                        <Stack spacing={2}>

                            <Typography variant='h3'>
                                {product.title}
                            </Typography>
                            <Typography variant='body1'>
                                {product.description}
                            </Typography>
                            <Typography>
                                {product.rating?.rate}
                            </Typography>
                            <Typography >
                                {new Intl.NumberFormat(undefined, { currency: "USD", style: "currency" }).format(product.price)}
                            </Typography>
                            <Button>Add to Cart</Button>
                            <Button>Contiue Shopping</Button>
                        </Stack>
                    </Container>

                </Box>
            </Stack>
        </Box>
    )
}

export default SingleProduct