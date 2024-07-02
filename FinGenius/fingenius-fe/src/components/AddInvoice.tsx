import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import Alert from "./Alert";

const AddInvoice = ({ invoiceType }) => {
    const initialState = {
        type: invoiceType,
        invoiceDate: new Date().toISOString().split("T")[0],
        dueDate: new Date().toISOString().split("T")[0],
        invoiceNo: "",
        partnerId: "",
        creditTerm: 0,
        reference: "",
        invoiceTotal: 0,
        invoiceItems: [],
    };

    const [invoiceData, setInvoiceData] = useState(initialState);

    let { dueDate, invoiceNo, partnerId, creditTerm, reference, invoiceItems } =
        invoiceData;

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

export default AddInvoice;
