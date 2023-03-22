import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../components/storeSlice";
import PaymentSuccessful from "../components/PaymentSuccessful";
import EmptyCart from "../components/EmptyCart";
import axios from "axios";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#495057",
      fontFamily: "inherit",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#6c757d",
      },
    },
    invalid: {
      color: "#dc3545",
      iconColor: "#dc3545",
    },
  },
};

export default function PaymentPage() {
  const { totalPrice, cartItems, isPaymentSuccessful } = useSelector(
    (state) => state.store
  );
  const dispatch = useDispatch();

  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error && totalPrice !== 0) {
        try {
          const {id} = paymentMethod;
          const response = await axios.post(`/payment`, {
            amount: Math.round(totalPrice * 100),
            id
          })
  
          if (response.data.success) {
            console.log("Successful Payment")
            dispatch(clearCart())
            setSuccess(true)
          }
  
        } catch (error) {
          console.log("Error", error)
        }
      } else {
        console.log(error.message)
      }
  }

  return <div>
     {
        !isPaymentSuccessful && cartItems.length === 0 ? 
        <EmptyCart /> 
        :
          !success ?
          <div className='payment-div'>
            <Card 
              sx={{ maxWidth: 500 }} 
              className='payment-card'
            >
              <CardContent>
                <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
                  Complete Payment
                </Typography>
                <br />
                <CardElement options={CARD_ELEMENT_OPTIONS}/>
              </CardContent>
              <CardActions>
                <Button 
                  variant="contained" 
                  className='pay-button' 
                  onClick={(e) => handleSubmit(e)}
                >
                  Pay
                </Button>
              </CardActions>
            </Card>
            <div className='pay-credentials'>
              <Typography>
                <span className='card-number'>*Test card number: </span>  4242 4242 4242 4242 
              </Typography>
              <Typography>
                *The other card details (expiry date, CVC, and ZIP) can be random.
              </Typography>
            </div>
          </div> 
          : 
          <PaymentSuccessful />
      }
  </div>;
}
