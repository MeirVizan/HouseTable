import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Alert, TextField } from '@mui/material';

const api_url = 'http://localhost:4000'


function HouseForm() {
    const [alertMassage, setAlertMassage] = useState({ flag: false, type: '', massage: '' })
    const [newId, setNewId] = useState()
    const [house, setHouse] = useState({
        address: '',
        currentValue: '',
        loanAmount: '',
        id: null
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (house.currentValue === '' || house.loanAmount === '' || house.address === '') {
            setAlertMassage({ flag: true, info: 'error', massage: 'One of the fields is missing' })
            return;
        }

        try {
            const response = await axios.post(`${api_url}/api/houses`, house);

            // After successful submission in NewHouseForm component
            console.log('New house created:', response.data);
            const newHouseId = response.data.id;
            setNewId(newHouseId)
            setHouse({
                address: '',
                currentValue: '',
                loanAmount: '',
                id: null
            })
            setAlertMassage({ flag: true, info: 'success', massage: 'The House record was created successfully!' })

        } catch (error) {
            console.error('Error creating house:', error);
        }

    };


    const onChange = (key, value) => {
        setHouse({
            ...house,
            [key]: value
        })
    }
    return (
        <div>

            <form style={{ display: 'grid', width: '20%', margin: '122px auto' }} onSubmit={handleSubmit}>
                {alertMassage.flag && <Alert severity="success" color={alertMassage.info}>
                    {alertMassage.massage}
                </Alert>}

                <Card sx={{ minWidth: 275 }}>
                    <CardContent>

                        <TextField
                            style={{ display: 'grid', maxWidth: '100%', width: '90%', marginBottom: '30px' }}
                            type="text"
                            label="Address"
                            value={house.address}
                            onChange={(e) => onChange("address", e.target.value)}
                        />
                        <TextField
                            style={{ display: 'grid', maxWidth: '100%', width: '90%', marginBottom: '30px' }}
                            type="number"
                            label="Current Value"
                            value={house.currentValue}
                            onChange={(e) => onChange("currentValue", e.target.value)}
                        />
                        <TextField
                            style={{ display: 'grid', maxWidth: '100%', width: '90%', marginBottom: '30px' }}
                            type="number"
                            label="Loan Amount"
                            value={house.loanAmount}
                            onChange={(e) => onChange("loanAmount", e.target.value)}
                        />

                    </CardContent>
                    <CardActions>
                        <Button variant="outlined" size="small" type="submit">{'שמור'}</Button>
                    </CardActions>
                </Card>
                <div style={{ display: 'flex', margin: 'auto' }}>
                    {newId &&
                        <Link to={`/housedetail/${newId}`} state={{ newId }} > New House number redorded: {newId} </Link>
                    }

                </div>
            </form>

        </div>
    );
}

export default HouseForm;
