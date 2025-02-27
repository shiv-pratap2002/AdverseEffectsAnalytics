import React, { useState, useEffect } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { Typography } from '@mui/material';

const Loading = () => {
    // TEMPORARY JUGAAD FOR LOADING TEXT DATA CHANGING
    const [currentIndex, setCurrentIndex] = useState(0);
    const labels = ["Uploading the Requirements...", "Processing...", "Generating the Output..."];

    useEffect(() => {
        if (currentIndex === labels.length - 1) {
          console.log("stopping");
          return;
        };
        const interval = setInterval(() => {
          const updatedData = currentIndex + 1;
          setCurrentIndex(updatedData);
        }, 2500);
    
        return () => clearInterval(interval);
    }, [currentIndex]);

      
    return (
        <div style={{
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
                variant='h4'
                sx={{ marginTop: '20px' }}
            >
                {labels[currentIndex]}
            </Typography>
            <BallTriangle
                height={80}
                width={80}
                radius={5}
                color="#fff"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default Loading