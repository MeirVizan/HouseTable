import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const api_url = 'http://localhost:4000'


function HouseDetail() {
    const [house, setHouse] = useState(null);


    useEffect(() => {
        async function fetchHouseDetails() {

            const newId = window.location.pathname.split("/").pop()
            try {
                console.log(11111, newId)
                const response = await axios.get(`${api_url}/api/houses/${newId}`);
                setHouse(response.data);
            } catch (error) {
                console.error('Error fetching house details:', error);
            }
        }
        fetchHouseDetails();
    }, []);

    if (!house) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{
            display: 'block',
            textAlign: 'center',
            margin: '100px auto'
        }}>
            <div style={{ textAlign: 'center' }}>

                <h1>House Evaluation System</h1>
            </div>
            <h2>House Details</h2>
            <p>Address: {house.address}</p>
            <p>Current Value: {house.currentValue}</p>
            {/* Display loanAmount and risk */}
            <p>Loan Amount: {house.loanAmount}</p>
            <p>Risk: {house.risk}</p>
            <Link to={`/updateHouseForm/${house.id}`} > {"Edit"} </Link>

        </div>
    );
}

export default HouseDetail;
