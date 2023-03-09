import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../components/storeSlice";
import ProductsList from "../components/ProductsList";

function ShopPage() {

// Access the Redux state in the ShopPage component using the useSelector Hook.

  const { categories, isCategoriesFetched } = useSelector(
    (state) => state.store
  );
  const dispatch = useDispatch();

  // Use the useEffect and useDispatch Hooks to dispatch the fetchCategories
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Shop</h1>
      {!isCategoriesFetched ? (
        <p>Fetching Products Categories....</p>
      ) : (
        categories.map((category, idx) => (
          <div key={idx}>
            <h2
              key={idx}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                backgroundColor: "#1875d1",
                height: "50px",
                color: "white",
              }}
            >
              {category.toUpperCase()}
            </h2>
            <ProductsList category={category} />
            <br />
          </div>
        ))
      )}
    </div>
  );
}

export default ShopPage
