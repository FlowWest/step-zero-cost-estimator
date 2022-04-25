import React, { useEffect, useState, useContext } from 'react';
import { Button, Grid, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FC } from '../util';
import Autocomplete from '../components/uiComponents/Autocomplete';
import ContentWrapper from '../components/uiComponents/ContentWrapper';
import CostComparisonSummary from '../components/CostComparisonSummary/CostComparisonSummary';
import { WaterSystemContext } from '../contexts/WaterSystem';
import { updateWaterSystem } from '../contexts/WaterSystem/actions';

const useStyles = makeStyles((theme: Theme) => ({
  buttonContainer: {
    alignSelf: 'center',
    margin: '0 1rem'
  },
  gridItemContainer: {
    margin: '1rem 0'
  }
}));

const dropdownOptions = [
  { id: 1, name: 'Water System A', population: 100, connections: 100, distance: 3000 },
  { id: 2, name: 'Water System B', population: 100, connections: 200, distance: 1000 },
  { id: 3, name: 'Water System C', population: 0, connections: 0, distance: 2500 },
  { id: 4, name: 'Water System D', population: 100, connections: 50, distance: 0 }
];

const IndexPage: FC = () => {
  const styles = useStyles();
  const [state, dispatch] = useContext(WaterSystemContext);

  const handleWaterSystemChange = (value: any) => {
    // from autocomplete value will be object or string
    let newWaterSystem;
    if (value?.constructor === Object) {
      newWaterSystem = value;
    } else if (typeof value === 'string') {
      newWaterSystem = {
        name: value,
        id: null
      };
    }
    dispatch(updateWaterSystem(newWaterSystem));
  };

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
      <Grid container item xs={12}>
        <Grid item xs={8} md={5}>
          <Autocomplete
            dropdownLabel={'Water System'}
            dropdownPlaceholder={'Select or type in your water system'}
            dropdownOptions={dropdownOptions}
            selectedObject={state.currentWaterSystem}
            setSelectedObject={handleWaterSystemChange}
          />
        </Grid>
        {Object.keys(state.currentWaterSystem).length > 0 && (
          <Grid item xs={12} md={4} className={styles.buttonContainer}>
            <Button
              onClick={() => {
                dispatch({ type: 'update_water_system', payload: {} });
              }}
            >
              Select a new water system
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid container item xs={12} style={{ gap: '50px' }}>
        <Grid item xs={12} className={styles.gridItemContainer}>
          <ContentWrapper
            title={`Cost Comparison Summary ${
              state.currentWaterSystem?.name ? `for ${state.currentWaterSystem?.name}` : ''
            }`}
          >
            <CostComparisonSummary selectedWaterSystem={state.currentWaterSystem} />
          </ContentWrapper>
        </Grid>
        <Grid item xs={12} className={styles.gridItemContainer}>
          <ContentWrapper title="Calculation Methodology Explanation">
            <Typography paragraph>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit quis voluptates
              perspiciatis quas. Officiis, eligendi!
            </Typography>
            <Typography paragraph>
              Paragraph describing math behind the calculations, providing helpful information,
              answering FAQS etc? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in
            </Typography>
            <Typography paragraph>
              Paragraph describing math behind the calculations, providing helpful information,
              answering FAQS etc? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in
            </Typography>
            <Typography paragraph>
              Paragraph describing math behind the calculations, providing helpful information,
              answering FAQS etc? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in
            </Typography>
          </ContentWrapper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default IndexPage;
