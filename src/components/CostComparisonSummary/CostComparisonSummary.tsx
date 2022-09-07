import React from 'react';
import { Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CostComparisonWrapper from './CostComparisonWrapper';
import { WaterSystem } from '../../util/interfaces';
import { formatToUSD } from '../../util/util';
import { getConsolidationCostDetails } from '../../util/costUtil';

const useStyles = makeStyles((theme: Theme) => ({
  totalCostLabel: {
    fontWeight: 600
  }
}));

const CostComparisonSummary = ({
  selectedWaterSystem,
  consolidationCostParams,
  cipCostData
}: {
  selectedWaterSystem: WaterSystem;
  consolidationCostParams: any;
  cipCostData: any;
}) => {
  const classes = useStyles();

  // Variable that holds calculated total cost of consolidation
  const consolidationCostDetails = getConsolidationCostDetails({
    waterSystemDetails: selectedWaterSystem,
    consolidationCostParams: consolidationCostParams
  });

  return (
    <>
      {selectedWaterSystem && Object.keys(selectedWaterSystem).length ? (
        <div>
          <Typography paragraph>
            Provide the required information in both the Consolidation and Capital Improvment Plan
            calculators to view your cost comparison.
          </Typography>
          <Typography paragraph>
            <span className={classes.totalCostLabel}>Consolidation Costs: </span>
            {formatToUSD(consolidationCostDetails.total)}
          </Typography>
          <Typography paragraph>
            <span className={classes.totalCostLabel}>Capital Improvement Costs: </span>
            {formatToUSD(cipCostData?.total)}
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
