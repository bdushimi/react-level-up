import React, { useState, useEffect } from "react";

import ProductCard from "./ProductCard";


export default function ProductsList({ category }) {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/category/${category}?limit=4`)
      .then((response) => response.json())
      .then((data) => setProductList(data));
  }, [category]);

  return (
    <div className="wrapper">
      {productList.map((product) => {
        return <ProductCard product={product} />
      })}
    </div>
  );
}
