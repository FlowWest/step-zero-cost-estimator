import React, { useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import ComponentDataGrid from './ComponentDataGrid';
import TotalCIPDataGrid from './TotalCIPDataGrid';
import WarningMessage from '../../uiComponents/WarningMessage';
import { WaterSystemContext } from '../../../contexts/WaterSystem';
import { updateCIPCostData } from '../../../contexts/WaterSystem/actions';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  tableContainer: {
    marginBottom: '2rem'
  }
}));

const WaterSystemComponentsGrid = ({ openAddComponents }: { openAddComponents: Function }) => {
  const [state, dispatch] = useContext(WaterSystemContext);
  const styles = useStyles();

  const getNewGridState = (params: any) => {
    dispatch(
      updateCIPCostData(params.id, {
        installedCost: params.getValue(params.id, 'installedCost'),
        annualReserve: params.getValue(params.id, 'annualReserve')
      })
    );
  };

  return (
    <>
      <Grid item xs={12} className={styles.tableContainer}>
        <Typography style={{ fontWeight: 600 }}>
          Total Existing and New Project Capital Improvement Costs
        </Typography>
        <TotalCIPDataGrid />
      </Grid>
      <Grid item xs={12} className={styles.tableContainer}>
        <Typography style={{ fontWeight: 600 }}>Existing Components</Typography>
        <ComponentDataGrid
          rows={state.existingComponents}
          openAddComponents={openAddComponents}
          connections={state.consolidationCostParams.connections}
          getNewGridState={getNewGridState}
        />
      </Grid>
      <Grid item xs={12} className={styles.tableContainer}>
        <Typography style={{ fontWeight: 600 }}>New Components</Typography>
        <ComponentDataGrid
          rows={state.newComponents}
          openAddComponents={openAddComponents}
          connections={state.consolidationCostParams.connections}
          getNewGridState={getNewGridState}
        />
      </Grid>
      <Grid item>
        <WarningMessage />
      </Grid>
    </>
  );
};

export default WaterSystemComponentsGrid;
