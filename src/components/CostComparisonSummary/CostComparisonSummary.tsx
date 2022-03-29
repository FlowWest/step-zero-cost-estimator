import React from 'react';
import { FC } from '../../util';
import { Button, Grid, MenuItem, TextField, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    fontWeight: 'bold'
  }
}));

const CostComparisonSummary: FC = () => {
  const styles = useStyles();
  return (
    <div>
      <Typography variant="h5" gutterBottom className={styles.header}>
        Cost Comparison Summary
      </Typography>
    </div>
  );
};

export default CostComparisonSummary;
