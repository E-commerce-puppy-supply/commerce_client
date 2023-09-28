import { Box, Button, Card, Container, CssBaseline, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useUser } from '../Context/UserContext'



const Cart = () => {
  const { state: { cart } } = useUser();
  const [total, setTotal] = useState();

  // create function for adding up the total
  const cartTotal = (total, price, qty) => {
    return total = price * qty;
  }

  const getTotal = (products)=>{
    
    return products.reduce(total, item)

  }

  return (

    <Box>
      <CssBaseline />
      <Container maxWidth='xl'>
        <Stack divider={<Divider orientation="horizontal" flexItem />} spacing={2}>

          {cart.map(item =>
            <Box>
              <Stack direction="row" spacing={7}>
              <img src={item.image} width={125} height={125} />
              <Box>
                
                <Stack direction="row" spacing={7}>
                  <Typography>{new Intl.NumberFormat(undefined, { currency: "USD", style: "currency" }).format(item.price)}</Typography>                 
                  <Button>+</Button>
                  <Typography>{item.qty}</Typography>
                  <Button>_</Button>
                  <Button>remove</Button>
                  <Typography>
                    {new Intl.NumberFormat(undefined, { currency: "USD", style: "currency" }).format(item.price * item.qty)}
                  
                  </Typography>
                </Stack>
              </Box>
              </Stack>
              
            </Box>

          )}
        </Stack>
      </Container>
    </Box>
  )
}

export default Cart