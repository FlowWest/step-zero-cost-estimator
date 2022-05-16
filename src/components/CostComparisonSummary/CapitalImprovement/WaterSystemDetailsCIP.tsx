import React, { useContext } from 'react';
import { Typography, Grid, Theme, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { WaterSystemContext } from '../../../contexts/WaterSystem';
import { updateConsolidationCostParams } from '../../../contexts/WaterSystem/actions';

const useStyles = makeStyles((theme: Theme) => ({
  cipHeader: {
    fontWeight: 600
  },
  waterSystemDetailsHeader: {
    fontSize: '1.1rem',
    fontWeight: 600
  },
  waterSystemDetailsWrapper: {
    background: theme.palette.background.default,
    borderRadius: 1,
    border: `1px solid #000`,
    paddingBottom: '1rem',
    paddingRight: '1rem',
    width: '100%',
    marginLeft: 0
  }
}));

const WaterSystemDetailsCIP = () => {
  const classes = useStyles();
  const [state, dispatch] = useContext(WaterSystemContext);

  const handleConnectionsChange = (event: any) => {
    dispatch(
      updateConsolidationCostParams({
        ...state.consolidationCostParams,
        connections: event.target?.value
      })
    );
  };

  return (
    <Grid item xs={12}>
      <Grid container spacing={2} className={classes.waterSystemDetailsWrapper}>
        <Grid item xs={12}>
          <Typography className={classes.waterSystemDetailsHeader}>Water System Details</Typography>
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="System Name"
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            defaultValue={`${state.currentWaterSystem.joinSystemName}`}
            disabled
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="System ID"
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            defaultValue={
              state.currentWaterSystem.joinSystemPWSID
                ? `${state.currentWaterSystem.joinSystemPWSID}`
                : 'N/A'
            }
            disabled
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Number of Connections"
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            type="number"
            defaultValue={state.consolidationCostParams.connections}
            onChange={handleConnectionsChange}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WaterSystemDetailsCIP;
