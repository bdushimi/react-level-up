import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";

// Import custom actions
import { addToCart } from "./storeSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  function handleAddToCart() {
    dispatch(addToCart(product));
  }

  return (
    <Card variant="outlined" className="card">
      <CardMedia
        component="img"
        className="card-image"
        image={product.image}
        alt={product.title}
      />
      <CardContent>
        <Typography gutterBottom variant="body2" component="div">
          {product.title}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          className="card-button"
          size="small"
          variant="contained"
          onClick={() => handleAddToCart()}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
