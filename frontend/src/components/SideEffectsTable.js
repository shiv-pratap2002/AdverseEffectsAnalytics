import React from 'react';
import Loading from './Loading';
import InitialState from './InitialState';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import { CSVLink } from 'react-csv';

const SideEffectsTable = ({ loading, effectsData, key, keyword }) => {
    const abstractTable = effectsData?.abstract_table || [];
    const data = abstractTable.map(({ title, side_effects, URL }, index) => ({
        title,
        side_effects,
        URL
    }));

    // csv config
    const headers = [
        { label: 'Article Title', key: 'title' },
        { label: 'Side Effects Listed', key: 'side_effects' },
        { label: 'URL', key: 'URL' }
    ];

    return (
        <div key={key}>
            {effectsData ?
                <div style={{ display: 'flex', flexDirection: 'column', padding: '30px', justifyContent: 'center', alignItems: 'center' }}>
                    <div>
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            sx={{ marginBottom: '20px' }}
                        >&#10003; List of Articles mentioning the side-effects of {keyword}</Typography>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650, '& th, & td, & button': { fontSize: '1.1rem' } }} stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: '42.50%', fontSize: '1.2rem', fontWeight: 'bold' }}>Article Title</TableCell>
                                    <TableCell style={{ width: '32.50%', fontSize: '1.2rem', fontWeight: 'bold' }}>Side Effects Listed</TableCell>
                                    <TableCell style={{ width: '25.00%', fontSize: '1.2rem', fontWeight: 'bold' }}>URL</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            style={{ verticalAlign: 'top', textAlign: 'justify' }}
                                        >
                                            {row.title}
                                        </TableCell>
                                        <TableCell style={{ verticalAlign: 'top' }}>
                                            <ul style={{ margin: 0, paddingInlineStart: 0, listStyle: 'none' }}>
                                                {row.side_effects.map((effect, idx) => (
                                                    <li key={idx}>{idx + 1}. {effect}</li>
                                                ))}
                                            </ul>
                                        </TableCell>
                                        <TableCell style={{ verticalAlign: 'top' }}>
                                            <Button
                                                href={row.URL}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                variant="contained"
                                                color="primary"
                                            >
                                                Visit &nbsp; <OpenInNew fontSize="small" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <CSVLink data={data} headers={headers} filename={`${keyword}-sideeffects-list.csv`}>
                        <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                            Export to CSV
                        </Button>
                    </CSVLink>
                </div>
                : loading ? <Loading /> : <div><InitialState /></div>
            }
        </div>
    )
}

export default SideEffectsTable