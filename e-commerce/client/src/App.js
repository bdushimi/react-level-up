import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ShopPage from "./pages/ShopPage";
import CheckoutPage from "./pages/CheckoutPage";


import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/shop" element={<ShopPage />} />
        <Route exact path="/checkout" element={<CheckoutPage/>}/>
        <Route 
          path="*"
          element={<Navigate to="/shop" replace/>}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
