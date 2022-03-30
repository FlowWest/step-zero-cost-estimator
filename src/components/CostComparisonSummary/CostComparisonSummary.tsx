import React from 'react';
import { FC } from '../../util';
import { Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CostComparisonWrapper from './CostComparisonWrapper';

const useStyles = makeStyles((theme: Theme) => ({
  totalCostLabel: {
    fontWeight: 600
  }
}));

const CostComparisonSummary: FC = (props) => {
  const styles = useStyles();
  const dummyCosts = {
    cc: 564545289,
    cip: 4453454335
  };

  const convertUSD = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return (
    <div>
      <Typography paragraph>Complete both calculators for cost comparison</Typography>
      <Typography paragraph>
        <span className={styles.totalCostLabel}>Consolidation Costs: </span>
        {convertUSD.format(dummyCosts.cc)}
      </Typography>
      <Typography paragraph>
        <span className={styles.totalCostLabel}>Capital Improvement Costs: </span>
        {convertUSD.format(dummyCosts.cip)}
      </Typography>
      <CostComparisonWrapper />
    </div>
  );
};

export default CostComparisonSummary;
