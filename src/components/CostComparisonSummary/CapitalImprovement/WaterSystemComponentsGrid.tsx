import React, { useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import ComponentDataGrid from './ComponentDataGrid';
import { WaterSystemContext } from '../../../contexts/WaterSystem';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  tableContainer: {
    marginBottom: '2rem'
  }
}));

const WaterSystemComponentsGrid = () => {
  const [state, dispatch] = useContext(WaterSystemContext);
  const styles = useStyles();

  return (
    <>
      <Grid item xs={12} className={styles.tableContainer}>
        <Typography style={{ fontWeight: 600 }}>Existing Components</Typography>
        <ComponentDataGrid rows={state.existingComponents} />
      </Grid>
      <Grid item xs={12} className={styles.tableContainer}>
        <Typography style={{ fontWeight: 600 }}>New Components</Typography>
        <ComponentDataGrid rows={state.newComponents} />
      </Grid>
    </>
  );
};

export default WaterSystemComponentsGrid;
