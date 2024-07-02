import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Graph from "./Graph";
import Spinner from "./Spinner";
import Alert from "./Alert";

const Home = () => {
    const [groupedInvoices, setGroupedInvoices] = useState([]);

    // TODO: Write your JavaScript code here

    return (
        <div>
            <NavBar />
            <div className="container text-center mt-4">
                {/* TODO: Write your JSX code here */}
            </div>
        </div>
    );
};

export default Home;
