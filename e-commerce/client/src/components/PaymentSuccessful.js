import React from 'react'
import { Card, CardContent, Typography, CardMedia} from '@mui/material';
import complete from '../assets/complete.png'

export default function PaymentSuccessful() {
  return (
    <div className='s-div'>
        <Card variant='outlined' className='s-payment' sx={{maxWidth: 500}}>
            <CardMedia component="img" image={complete} alt="Succesfull Payment" className='s-media'/>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Payment Succesfull
                </Typography>
            </CardContent>
        </Card>
    </div>
  )
}
