import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import Alert from "./Alert";

const EditProduct = () => {
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
                {/* TODO: Write your JSX code here */}
            </div>
        </div>
    );
};

export default EditProduct;
