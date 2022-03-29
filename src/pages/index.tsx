import React from 'react';
import { Grid, MenuItem, TextField, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FC } from '../util';
import Dropdown from '../components/uiComponents/Dropdown';
import CostComparisonSummary from '../components/CostComparisonSummary/CostComparisonSummary';

const useStyles = makeStyles((theme: Theme) => ({
  gridItem: {
    margin: '1rem 0'
  }
}));

const waterSystems = {
  dropdownLabel: 'Water System',
  dropdownPlaceholder: 'Select a water system',
  dropdownOptions: [
    { name: 'Water System A', id: 1 },
    { name: 'Water System B', id: 2 },
    { name: 'Water System C', id: 3 },
    { name: 'Water System D', id: 4 }
  ]
};

const IndexPage: FC = () => {
  const styles = useStyles();

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Step Zero Calculator
        </Typography>
        <Typography paragraph>
          Paragraph describing step zero as a precursor to feasability study. Explain to the user
          what the consolidation and capital improvement caluclatros are used for, as well as how to
          use the below input fields, expecations, warnings, reminders, etc etc. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Dropdown {...waterSystems} />
      </Grid>
      <Grid item xs={12} className={styles.gridItem}>
        <CostComparisonSummary />
      </Grid>
    </Grid>
  );
};

export default IndexPage;
