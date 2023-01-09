import React, { useState, useContext, useEffect } from 'react';
import { Grid, Button, Divider, Theme } from '@mui/material';
import AddTreatmentsModal from './AddTreatmentsModal';
import TreatmentsDataGrid from './TreatmentsDataGrid';
import { WaterSystemContext } from '../../../../contexts/WaterSystem';
import { updateCIPCostData } from '../../../../contexts/WaterSystem/actions';
import ExportButtonGroup from '../../../uiComponents/ExportButtonGroup';
import WarningMessage from '../../../uiComponents/WarningMessage';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  tableContainer: {
    marginBottom: '2rem'
  },
  contentContainer: {
    paddingTop: '1rem'
  }
}));

function TreatmentsTab() {
  const classes = useStyles();
  const [state, dispatch] = useContext(WaterSystemContext) as any;
  const [open, setOpen] = useState(false);
  const [totalCostValues, setTotalCostValues] = useState([] as Array<any>);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setTotalCostValues([...state.selectedTreatments]);
  }, [state.selectedTreatments]);

  useEffect(() => {
    const updatedCostValues = totalCostValues.reduce(
      (previousValue, currentValue) => {
        const newValue = { ...previousValue };

        newValue.operationalCost += currentValue.operationalCost || 0;
        newValue.capitalCost += currentValue.capitalCost || 0;

        return newValue;
      },
      {
        operationalCost: 0,
        capitalCost: 0
      }
    );
    dispatch(updateCIPCostData('treatmentOperational', updatedCostValues.operationalCost));
    dispatch(updateCIPCostData('treatmentCapital', updatedCostValues.capitalCost));
  }, [totalCostValues]);
  return (
    <>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleOpen}>
          Add Treatments
        </Button>
      </Grid>
      <br />
      <Grid item xs={12} className={classes.tableContainer}>
        <TreatmentsDataGrid
          rows={state.selectedTreatments}
          openAddTreatments={setOpen}
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
        <ExportButtonGroup state={state} />
      </Grid>
      <AddTreatmentsModal open={open} handleClose={handleClose} />
    </>
  );
}

export default TreatmentsTab;
