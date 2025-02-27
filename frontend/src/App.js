import './App.css';
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Grid, Typography, CssBaseline, Paper } from '@mui/material';
import LeftComponent from './components/LeftComponent';
import Refresh from './components/Refresh';
import UpChart from './components/UpChart';
import SideEffectsChart from './components/SideEffectsChart';
import SideEffectsTable from './components/SideEffectsTable';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});

function App() {
  const [effectsData, setEffectsData] = useState(null);
  const [numArticles, setNumArticles] = useState(null);
  const [keyword, setKeyword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEffectsDataChange = (data) => {
    setEffectsData(data);
  };

  const handleNumArticlesChange = (num) => {
    setNumArticles(num);
  };

  const handleLoading = (isLoading) => {
    setLoading(isLoading);
  };

  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
    setEffectsData(null);
    setNumArticles(0);
    setKeyword(null);
  };

  const handleKeyword = (data) => {
    setKeyword(data);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          variant="h2"
          sx={{ textAlign: 'center', fontWeight: 'bold', marginTop: '15px', marginLeft: '30px', color: '#94d2bd' }}
        >
          Adverse Effects
        </Typography>
        <Refresh onClick={handleRefresh} />
      </div>
      <div style={{ marginTop: '-30px' }}>
        <Grid
          container
          spacing={2}
          sx={{ padding: '25px' }}
        >
          <Grid item md={5} sm={12} xs={12}>
            <LeftComponent
              handleEffectsDataChange={handleEffectsDataChange}
              handleNumArticlesChange={handleNumArticlesChange}
              handleLoading={handleLoading}
              handleKeyword={handleKeyword}
            />
          </Grid>
          <Grid item md={7} sm={12} xs={12} >
            <Paper elevation={4}>
              <UpChart
                effectsData={effectsData}
                numArticles={numArticles}
                loading={loading}
                key={refreshKey}
                keyword={keyword}
              />
            </Paper>
          </Grid>
          <Grid item md={5} sm={12} xs={12}>
          </Grid>
          <Grid item md={7} sm={12} xs={12}>
            <Paper elevation={4}>
              <SideEffectsChart
                effectsData={effectsData}
                loading={loading}
                key={refreshKey}
              />
            </Paper>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{ padding: '25px' }}
        >
          <Grid item md={12} xs={12}>
            <Paper elevation={4}>
              <SideEffectsTable
                effectsData={effectsData}
                loading={loading}
                key={refreshKey}
                keyword={keyword}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
