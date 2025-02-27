import React from 'react';
import { Typography } from '@mui/material';
import { SentimentVerySatisfied } from '@mui/icons-material';

const InitialState = () => {
    return (
        <div
            style={{
                padding: '50px',
                height: '43vh',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                fontSize: '1.1rem'
            }}>
            <Typography
                variant='h5'
                sx={{ marginTop: '20px' }}
            >
                Enter the input details to get the Distribution Analysis!
            </Typography>
            <div>
                <SentimentVerySatisfied sx={{ fontSize: '3rem' }} />
            </div>
        </div>
    )
}

export default InitialState