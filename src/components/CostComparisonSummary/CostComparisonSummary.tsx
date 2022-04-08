import React from 'react';
import { FC } from '../../util';
import { Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CostComparisonWrapper from './CostComparisonWrapper';
import { WaterSystem } from '../../util/interfaces';

const useStyles = makeStyles((theme: Theme) => ({
  totalCostLabel: {
    fontWeight: 600
  }
}));

const CostComparisonSummary = ({ selectedWaterSystem }: { selectedWaterSystem: WaterSystem }) => {
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
    <>
      {Object.keys(selectedWaterSystem).length ? (
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
      ) : (
        <div>
          <Typography paragraph>
            Select a water system from the dropdown box above to complete the Consolidation and
            Capital Improvement Calculators to see a comparison of costs.
          </Typography>
        </div>
      )}
    </>
  );
};

export default CostComparisonSummary;
