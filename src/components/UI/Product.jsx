import React from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import DeleteIcon from '@mui/icons-material/Delete'
import { Rating, CardMedia, CardContent, Typography, Container, CssBaseline, Box, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../Context/UserContext'

const Product = ({ product }) => {
    const navigate = useNavigate();
    const { state, dispatch } = useUser();
    return (
        <Container>
            <CssBaseline />
            <Paper sx={{ maxWidth: 400 }}>
                <CardMedia
                    component="img"
                    width="400"
                    image={product.image}
                    onClick={() => navigate(`/product/${product.id}`)}
                />
                <CardContent>
                    <Typography >
                        {product.title}
                    </Typography>
                    <Rating name="read-only" value={product.rating.rate} readOnly />
                    <Typography>
                        {new Intl.NumberFormat(undefined, { currency: "USD", style: "currency" }).format(product.price)}
                    </Typography>                  
                    {!state.cart.some(p => p.id === product.id) ?
                        <Button variant="contained" onClick={() => {
                            if(!state.loggedIn){
                                return
                            } else{
                                dispatch({
                                    type: 'ADDTOCART',
                                    payload: product
                                })
                            }
                        }}>Add to Cart</Button> :
                        <Box>
                            <Box>
                                <Button
                                    onClick={() => {
                                        dispatch({
                                            type: "ADDTOCART",
                                            payload: product
                                        })
                                    }}
                                >+</Button>
                                <span>{state.cart.map((p) => {
                                    if (p.id === product.id)
                                        return p.qty
                                })} in the cart</span>
                                <Button
                                    onClick={() => {
                                        {
                                            dispatch({
                                                type: "subtractFromCart",
                                                payload: product,
                                            })
                                        }
                                    }}
                                >-</Button>
                            </Box>
                            <Button
                                variant="contained"
                                startIcon={<DeleteIcon />}
                                color="error"
                                onClick={() => {
                                    dispatch({
                                        type: "removeFromCart",
                                        payload: product,
                                    })
                                }}
                            >Remove</Button>
                        </Box>
                    }
                </CardContent>
            </Paper>
        </Container>

    )
}

export default Product