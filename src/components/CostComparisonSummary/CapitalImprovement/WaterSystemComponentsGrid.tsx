import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography, Divider } from '@mui/material';
import ComponentDataGrid from './ComponentDataGrid';
import TotalCIPDataGrid from './TotalCIPDataGrid';
import WarningMessage from '../../uiComponents/WarningMessage';
import { WaterSystemContext } from '../../../contexts/WaterSystem';
import ExportButtonGroup from '../../uiComponents/ExportButtonGroup';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  tableContainer: {
    marginBottom: '2rem'
  },
  contentContainer: {
    paddingTop: '1rem'
  }
}));

const WaterSystemComponentsGrid = ({ openAddComponents }: { openAddComponents: Function }) => {
  const [state, dispatch] = useContext(WaterSystemContext);
  const [totalCostValues, setTotalCostValues] = useState([] as Array<any>);
  const classes = useStyles();

  useEffect(() => {
    setTotalCostValues([...state.existingComponents, ...state.newComponents]);
  }, [state.existingComponents, state.newComponents]);

  return (
    <>
      <Grid item xs={12} className={classes.tableContainer}>
        <Typography style={{ fontWeight: 600 }}>
          Total Existing and New Project Capital Improvement Costs
        </Typography>
        <TotalCIPDataGrid
          totalCostValues={totalCostValues}
          connections={state.consolidationCostParams.connections}
        />
      </Grid>
      <Grid item xs={12} className={classes.tableContainer}>
        <Typography style={{ fontWeight: 600 }}>Existing Components</Typography>
        <ComponentDataGrid
          rows={state.existingComponents}
          openAddComponents={openAddComponents}
          connections={state.consolidationCostParams.connections}
          setTotalCostValues={setTotalCostValues}
        />
      </Grid>
      <Grid item xs={12} className={classes.tableContainer}>
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
      <Divider />
      <Grid
        spacing={2}
        container
        item
        xs={12}
        className={classes.contentContainer}
        justifyContent="flex-end"
        order={{ xs: 4, md: 4 }}
      >
        <ExportButtonGroup />
      </Grid>
    </>
  );
};

export default WaterSystemComponentsGrid;
