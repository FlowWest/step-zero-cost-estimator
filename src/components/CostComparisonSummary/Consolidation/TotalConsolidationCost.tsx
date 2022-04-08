import React, { useContext } from 'react';
import { WaterSystemContext } from '../../../contexts/WaterSystem';

const TotalConsolidationCost = () => {
  const [state, dispatch] = useContext(WaterSystemContext);
  return (
    <div>
      {Object.entries(state.consolidationCostParams)?.map(([key, value]: any) => {
        return (
          <div>
            {key}: {value}
          </div>
        );
      })}
    </div>
  );
};

export default TotalConsolidationCost;
