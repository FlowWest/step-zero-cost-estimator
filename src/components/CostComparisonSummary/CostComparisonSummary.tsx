import React from 'react';
import { Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CostComparisonWrapper from './CostComparisonWrapper';
import { WaterSystem } from '../../util/interfaces';
import { formatToUSD } from '../../util/util';
import { getConsolidationCostDetails } from '../../util/consolidationUtil';

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

  // Variable that holds calculated total cost of consolidation
  const consolidationCostDetails = getConsolidationCostDetails({
    waterSystemDetails: selectedWaterSystem,
    consolidationCostParams: consolidationCostParams
  });

  return (
    <>
      {selectedWaterSystem && Object.keys(selectedWaterSystem).length ? (
        <div>
          <Typography paragraph>Complete both calculators for cost comparison</Typography>
          <Typography paragraph>
            <span className={styles.totalCostLabel}>Consolidation Costs: </span>
            {formatToUSD(consolidationCostDetails.total)}
          </Typography>
          <Typography paragraph>
            <span className={styles.totalCostLabel}>Capital Improvement Costs: </span>
            {formatToUSD(4000000)}
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
