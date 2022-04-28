import React from 'react';
import { Typography, Grid, Theme, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

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
            defaultValue="Water System A"
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
            defaultValue="CA345643"
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
            defaultValue="150"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WaterSystemDetailsCIP;
