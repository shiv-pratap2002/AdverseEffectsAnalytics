import React, { useState } from 'react';
import { Paper, FormGroup, FormControl, TextField, RadioGroup, FormControlLabel, FormLabel, Radio, Button, Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import dayjs from 'dayjs';

const LeftComponent = ({ handleEffectsDataChange, handleNumArticlesChange, handleLoading, handleKeyword }) => {
    const [formData, setFormData] = useState({
        keyword: '',
        source: '',
        num_articles: ''
    });
    // const [dateRange, setDateRange] = useState([
    //     dayjs('2023-01-01'),
    //     dayjs('2024-01-31'),
    // ]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpload = (e) => {
        handleLoading(true);
        fetch('http://localhost:4000/adverse-effects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                handleEffectsDataChange(data);
                // console.log(data);
            })
            .catch(error => {
                console.error('Error sending form data:', error);
            })
            .finally(() => {
                handleLoading(false);
            });

        // console.log('Form Data : ', formData);
        handleNumArticlesChange(formData.num_articles);
        handleKeyword(formData.keyword);
        setFormData({
            keyword: '',
            source: '',
            num_articles: ''
        });
        // setDateRange([]);
        e.preventDefault();
    };
    return (
        <div>
            <Paper
                elevation={4}
                style={{ display: 'flex', flexDirection: 'column', padding: '20px', marginBottom: '20px' }}
            >
                {/* INPUT FORM */}
                <FormGroup>
                    {/* DRUG NAME */}
                    <FormControl>
                        <TextField
                            label="Drug Name"
                            type="text"
                            size="normal"
                            variant="outlined"
                            required
                            name="keyword"
                            value={formData.keyword}
                            onChange={handleChange}
                        />
                    </FormControl>

                    {/* Source and Number of Artciles */}
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <FormControl sx={{ marginTop: '20px' }}>
                            <FormLabel id="demo-row-radio-buttons-group-label" sx={{ fontSize: '17px', marginBottom: '-5px' }}>Select Source* : </FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="source"
                                value={formData.source}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="Pubmed" control={<Radio />} label="PubMed" />
                                <FormControlLabel value="Europe_PMC" control={<Radio />} label="EuropePMC" />
                                <FormControlLabel value="Twitter" control={<Radio />} label="Twitter" />
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <TextField
                                label="Number of Articles"
                                type="number"
                                size="normal"
                                variant="outlined"
                                InputProps={{
                                    inputProps: { min: 0 }
                                }}
                                required
                                name="num_articles"
                                value={formData.num_articles}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </div>

                    {/* DATE RANGE PICKER */}
                    <div>
                        <Typography sx={{ fontSize: '17px', color: '#cccccc' }}>Date Range :</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateRangePicker']}>
                                <DateRangePicker
                                    calenders={1}
                                    // name="date_range"
                                    // value={dateRange}
                                    // onChange={handleChange}
                                // value={value}
                                // onChange={(newValue) => setValue(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>

                    {/* UPLOAD BUTTON */}
                    <div
                        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}
                    >
                        <Typography sx={{ fontSize: '0.8rem', color: '#666', marginTop: '15px' }}>*Click on the below button to upload your requirements</Typography>
                        <Button
                            variant="outlined"
                            onClick={handleUpload}
                        >
                            Upload
                        </Button>
                    </div>

                    {/* {effectsData ? 
                        <div>
                            Data: {effectsData.identified_articles}
                        </div> 
                        :
                        <p>No</p>
                    } */}
                </FormGroup>
            </Paper>
        </div>
    )
}

export default LeftComponent