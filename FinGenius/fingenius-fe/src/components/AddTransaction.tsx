import React, { useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

const AddProduct = () => {
    const initialState = {
        name: "",
        coreCompany: "",
        rate: 0,
        status: "",
        taxExempted: "",
        salesTax: 0,
        notes: "",
    };

    const [productData, setProductData] = useState(initialState);

    const { name, coreCompany, rate, status, taxExempted, salesTax, notes } =
        productData;

    // TODO: Write your JavaScript code here

    return (
        <div>
            <NavBar />
            <div className="container mt-4">
                <h2>Add Product</h2>
                {/* TODO: Write your JSX code here */}
            </div>
        </div>
    );
};

export default AddProduct;
