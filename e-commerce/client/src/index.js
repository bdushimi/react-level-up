import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

// Stripe API integration
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const container = document.getElementById("root");
const root = createRoot(container);

const stripePromise = loadStripe(
  "pk_test_51Mh8HTJEoE1Szd7vKPnwJ06XiMb5LS0DCq2EYdm5zrD9QVDuD0EyT1iO4HBwRyze0gydEuiUElhOsDy8y4cZXM9q00p0Nx42oX"
);

root.render(
  <Provider store={store}>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
