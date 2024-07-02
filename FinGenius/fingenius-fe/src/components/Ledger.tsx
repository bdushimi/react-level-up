import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LedgerReport from "./LedgerReport";
import Spinner from "./Spinner";
import Alert from "./Alert";

const Ledger = () => {
    const initialState = {
        partnerId: "",
        startDate: "",
        endDate: "",
    };

    const [formData, setFormData] = useState(initialState);

    const { partnerId, startDate, endDate } = formData;

    // TODO: Write your JavaScript code here

    // TODO: Write your JSX code here
};

export default Ledger;
