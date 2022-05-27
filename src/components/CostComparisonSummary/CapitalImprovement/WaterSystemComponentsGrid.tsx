import React, { useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import ComponentDataGrid from './ComponentDataGrid';
import { WaterSystemContext } from '../../../contexts/WaterSystem';

const WaterSystemComponentsGrid = () => {
  const [state, dispatch] = useContext(WaterSystemContext);

  return (
    <>
      <Grid item xs={12}>
        <Typography style={{ fontWeight: 600 }}>Existing Components</Typography>
        <ComponentDataGrid rows={state.existingComponents} />
      </Grid>

      <Grid item xs={12}>
        <Typography style={{ fontWeight: 600 }}>New Components</Typography>
        <ComponentDataGrid rows={state.newComponents} />
      </Grid>
    </>
  );
};

export default WaterSystemComponentsGrid;
