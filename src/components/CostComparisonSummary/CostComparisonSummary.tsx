import React, { useContext } from 'react';
import { FC } from '../../util';
import { Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CostComparisonWrapper from './CostComparisonWrapper';
import { WaterSystem } from '../../util/interfaces';
import { formatToUSD } from '../../util/util';
import { getConsolidationCostDetails } from '../../util/consolidationUtil';
import { WaterSystemContext } from '../../contexts/WaterSystem';

const useStyles = makeStyles((theme: Theme) => ({
  totalCostLabel: {
    fontWeight: 600
  }
}));

const CostComparisonSummary = ({
  selectedWaterSystem,
  consolidationCostParams
}: {
  selectedWaterSystem: WaterSystem;
  consolidationCostParams: any;
}) => {
  const styles = useStyles();

  // function that calculates total cost of consolidation
  // getConsolidationCostDetails({
  //   waterSystemDetails: selectedWaterSystem,
  //   consolidationCostParams: consolidationCostParams
  // });

  // console.log(
  //   getConsolidationCostDetails({
  //     waterSystemDetails: selectedWaterSystem,
  //     consolidationCostParams: consolidationCostParams
  //   })
  // );


  const dummyCosts = {
    cc: 564545289,
    cip: 4453454335
  };

  return (
    <>
      {Object.keys(selectedWaterSystem).length ? (
        <div>
          <Typography paragraph>Complete both calculators for cost comparison</Typography>
          <Typography paragraph>
            <span className={styles.totalCostLabel}>Consolidation Costs: </span>
            {formatToUSD(dummyCosts.cc)}
          </Typography>
          <Typography paragraph>
            <span className={styles.totalCostLabel}>Capital Improvement Costs: </span>
            {formatToUSD(dummyCosts.cip)}
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
