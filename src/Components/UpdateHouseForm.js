import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, Button, Card, CardActions, CardContent, TextField } from '@mui/material';

const api_url = 'http://localhost:4000'


function UpdateHouseForm() {
    const [alertMassage, setAlertMassage] = useState({ flag: false, type: '', massage: '' })
    const [currentValue, setCurrentValue] = useState('');
    const [loanAmount, setLoanAmount] = useState('');

    const newId = window.location.pathname.split("/").pop()
    useEffect(() => {
        async function fetchHouseDetails() {


            try {
                const response = await axios.get(`${api_url}/api/houses/${newId}`);
                setCurrentValue(response.data.currentValue);
                setLoanAmount(response.data.loanAmount);
            } catch (error) {
                console.error('Error fetching house details:', error);
            }
        }
        fetchHouseDetails();
    }, [newId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (currentValue === '' || loanAmount === '') {
            setAlertMassage({ flag: true, info: 'error', massage: 'Current Value and Loan Amount must be valid numbers.' })
            return;
        }

        try {
            const response = await axios.put(`${api_url}/api/houses/${newId}`, {
                currentValue,
                loanAmount,
            });
            console.log('House updated:', response.data);
            setAlertMassage({ flag: true, info: 'success', massage: 'The House record was created successfully!' })
        } catch (error) {
            console.error('Error updating house:', error);
        }
    };

    return (
        <div>
            <form style={{ display: 'grid', width: '20%', margin: '122px auto' }} onSubmit={handleSubmit}>
                {alertMassage.flag &&
                    <Alert severity="success" color={alertMassage.info}>
                        {alertMassage.massage}
                    </Alert>}

                <Card sx={{ minWidth: 275 }}>
                    <CardContent>


                        <TextField
                            style={{ display: 'grid', maxWidth: '100%', width: '90%', marginBottom: '30px' }}
                            type="number"
                            label="Current Value"
                            value={currentValue}
                            onChange={(e) => setCurrentValue(e.target.value)}
                        />
                        <TextField
                            style={{ display: 'grid', maxWidth: '100%', width: '90%', marginBottom: '30px' }}
                            type="number"
                            label="Loan Amount"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(e.target.value)}
                        />

                    </CardContent>
                    <CardActions>
                        <Button variant="outlined" size="small" type="submit">{'עדכן'}</Button>
                    </CardActions>

                </Card>
            </form>
        </div>
    );
}

export default UpdateHouseForm;
