import React, { useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

const AddPartner = ({ partnerType }) => {
    const initialState = {
        type: partnerType,
        firstName: "",
        lastName: "",
        email: "",
        status: "",
        contactNo: "",
        openingBalance: 0,
        address: "",
        repName: "",
        repContact: "",
        repDesignation: "",
    };

    const [partnerData, setPartnerData] = useState(initialState);

    const {
        firstName,
        lastName,
        email,
        status,
        contactNo,
        openingBalance,
        address,
        repName,
        repContact,
        repDesignation,
    } = partnerData;

    // TODO: Write your JavaScript code here

    return (
        <div>
            <NavBar />
            <div className="container mt-4">
                <h2>Add {partnerType === "customer" ? "Customer" : "Vendor"}</h2>
                {/* TODO: Write your JSX code here */}
            </div>
        </div>
    );
};

export default AddPartner;
