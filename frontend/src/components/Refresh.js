import React from 'react'
import { Button } from '@mui/material';

const Refresh = ({ onClick }) => {
    return (
        <Button
            variant="outlined"
            sx={{ marginRight: '30px' }}
            onClick={onClick}
        >
            Refresh
        </Button>

    )
}

export default Refresh
