import { Box, Button, Card, Container, CssBaseline, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useUser } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'





const Cart = () => {
  const { state: { cart }, dispatch } = useUser();
  const navigate = useNavigate();

  return (

    <Box>
      <CssBaseline />
      <Container maxWidth='xl'>
        <Stack divider={<Divider orientation="horizontal" flexItem />} spacing={2}>

          {cart.map(item =>
            <Box key={item.id}>
              <Stack direction="row" spacing={7}>
              <img src={item.image} width={125} height={125} />
              <Box>                
                <Stack direction="row" spacing={7}>
                  <Typography>{new Intl.NumberFormat(undefined, { currency: "USD", style: "currency" }).format(item.price)}</Typography>                 
                  <Button onClick={()=>{
                    dispatch({
                      type:'ADDTOCART',
                      payload: item
                    })
                  }} >+</Button>
                  <Typography>{item.qty}</Typography>
                  <Button onClick={()=>{
                    dispatch({
                      type:'subtractFromCart',
                      payload: item
                    })
                  }}>-</Button>
                  <Button
                  onClick={() => {
                    dispatch({
                        type: "removeFromCart",
                        payload: item,
                    })
                }}>remove</Button>
                  <Typography>
                    {new Intl.NumberFormat(undefined, { currency: "USD", style: "currency" }).format(item.price * item.qty)}                  
                  </Typography>
                </Stack>
              </Box>
              </Stack>
             
            </Box>

          )}
        </Stack>
        <Typography>
          Total {new Intl.NumberFormat(undefined, { currency: "USD", style: "currency" }).format(
          cart.map((i)=>i.price * i.qty).reduce((total, num)=>total + num, 0))}
        </Typography>
      </Container>
      <Button onClick={()=>navigate('/checkout')}>Checkout</Button>
    </Box>
  )
}

export default Cart