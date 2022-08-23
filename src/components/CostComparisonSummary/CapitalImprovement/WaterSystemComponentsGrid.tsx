import React, { useContext, useEffect, useState } from 'react';
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
  const [totalCostValues, setTotalCostValues] = useState([] as Array<any>);
  const styles = useStyles();

  useEffect(() => {
    setTotalCostValues([...state.existingComponents, ...state.newComponents]);
  }, [state.existingComponents, state.newComponents]);

  return (
    <>
      <Grid item xs={12} className={styles.tableContainer}>
        <Typography style={{ fontWeight: 600 }}>
          Total Existing and New Project Capital Improvement Costs
        </Typography>
        <TotalCIPDataGrid
          totalCostValues={totalCostValues}
          connections={state.consolidationCostParams.connections}
        />
      </Grid>
      <Grid item xs={12} className={styles.tableContainer}>
        <Typography style={{ fontWeight: 600 }}>Existing Components</Typography>
        <ComponentDataGrid
          rows={state.existingComponents}
          openAddComponents={openAddComponents}
          connections={state.consolidationCostParams.connections}
          setTotalCostValues={setTotalCostValues}
        />
      </Grid>
      <Grid item xs={12} className={styles.tableContainer}>
        <Typography style={{ fontWeight: 600 }}>New Components</Typography>
        <ComponentDataGrid
          rows={state.newComponents}
          openAddComponents={openAddComponents}
          connections={state.consolidationCostParams.connections}
          setTotalCostValues={setTotalCostValues}
        />
      </Grid>
      <Grid item>
        <WarningMessage />
      </Grid>
    </>
  );
};

export default WaterSystemComponentsGrid;
