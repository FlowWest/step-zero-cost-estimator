import React, { useContext } from 'react';
import { Typography } from '@mui/material';
import { WaterSystemContext } from '../../../contexts/WaterSystem';
import { getConsolidationCostDetails } from '../../../util/consolidationUtil';

const TotalConsolidationCost = () => {
  const [state, dispatch] = useContext(WaterSystemContext);

  const { waterSystemDetails, consolidationCostParams } = state;
  const test = getConsolidationCostDetails({ waterSystemDetails, consolidationCostParams });
  return (
    <div>
      <Typography variant="h5" paragraph>
        Total Consolidation Cost: $
        {test.total.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}
      </Typography>
      <Typography variant="h4" paragraph>
        Water Rate per Connection: $
        {(test.total / consolidationCostParams.connections / 12 / 10).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}
      </Typography>
      {Object.entries(state.consolidationCostParams)?.map(([key, value]: any) => {
        return (
          <div>
            {key}: {value.toLocaleString()}
          </div>
        );
      })}
    </div>
  );
};

export default TotalConsolidationCost;
