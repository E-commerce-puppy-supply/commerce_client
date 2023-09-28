import React, { useState } from 'react';
import { useUser } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Stack } from '@mui/material'
import ReactDOM from 'react-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { CssBaseline } from '@mui/material';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const {state: {cart}, dispatch} = useUser();

  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();    

   

    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    const res = await fetch('/create-intent', {
      method: 'POST',
    });

    const { client_secret: clientSecret } = await res.json();

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret,
      confirmParams: {
        return_url: 'https://example.com/order/123/complete',
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button 
      // type="submit" 
      onClick={()=>{
        dispatch({
          type:"CLEAR_CART"
        })
        navigate("/complete")}}
      disabled={!stripe || !elements
      
      }>
        Pay
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

const stripePromise = loadStripe('pk_test_FQ6deVldliuH21qh1jc7TptQ');

const options = {
  mode: 'payment',
  amount: 1099,
  currency: 'usd',
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};

const Checkout = () => {
  const { state: { cart } } = useUser();
  const total = cart.map((i) => i.price * i.qty).reduce((total, num) => total + num, 0)

  const tax = total * 0.0625;

  return (

    <Box sx={{ paddingTop: 4 }}>
      <Stack>
        <Box
          sx={{ marginBottom: 4 }}>
          <Stack >
            <Typography>
              Total: {new Intl.NumberFormat(undefined, { currency: "USD", style: "currency" }).format(total)}
            </Typography>
            <Typography>
              Shipping & Handling: {new Intl.NumberFormat(undefined, { currency: "USD", style: "currency" }).format(2.99)}
            </Typography>
            <Typography>
              Free Shipping:   {new Intl.NumberFormat(undefined, { currency: "USD", style: "currency" }).format(-2.99)}
            </Typography>
            <Typography>
              Estimated tax to be collected:  {new Intl.NumberFormat(undefined, { currency: "USD", style: "currency" }).format(tax)}
            </Typography>
            <Typography>
              Order total:  {new Intl.NumberFormat(undefined, { currency: "USD", style: "currency" }).format(total + tax)}
            </Typography>
          </Stack>


        </Box>


        <Box>
          <Elements stripe={stripePromise} options={options}>
            <CssBaseline />
            <CheckoutForm />
          </Elements>
        </Box>
      </Stack>
    </Box>
  )
};

export default Checkout;