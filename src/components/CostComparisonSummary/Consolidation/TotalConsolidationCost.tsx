import React, { useContext, useEffect, useState } from 'react';
import { Typography, Theme } from '@mui/material';
import { WaterSystemContext } from '../../../contexts/WaterSystem';
import { getConsolidationCostDetails } from '../../../util/consolidationUtil';
import DoughnutChart from '../../uiComponents/DoughnutChart';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  totalCostContainer: {
    textAlign: 'center',
    paddingLeft: '1rem'
  }
}));

const TotalConsolidationCost = () => {
  const styles = useStyles();
  const [state, dispatch] = useContext(WaterSystemContext);

  const { currentWaterSystem, consolidationCostParams } = state;
  const [consolidationCostDetails, setConsolidationCostDetailset] = useState({} as any);

  // const { waterSystemDetails, consolidationCostParams } = state;
  // const consolidationCostDetails = getConsolidationCostDetails({ waterSystemDetails, consolidationCostParams });
  useEffect(() => {
    setConsolidationCostDetailset(
      getConsolidationCostDetails({
        currentWaterSystem,
        consolidationCostParams
      })
    );
  }, [state.consolidationCostParams]);

  return (
    <div className={styles.totalCostContainer}>
      <Typography variant="h5" paragraph>
        Total Consolidation Cost: $
        {consolidationCostDetails.total?.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}
      </Typography>
      <Typography variant="h6" paragraph>
        Cost per Connection: $
        {(
          consolidationCostDetails.total /
          consolidationCostParams.connections /
          12 /
          10
        ).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}
      </Typography>
      {/* {Object.entries(state.consolidationCostParams)?.map(([key, value]: any) => {
        return (
          <div>
            {key}: {value.toLocaleString()}
          </div>
        );
      })} */}
      <DoughnutChart chartData={consolidationCostDetails} />
    </div>
  );
};

export default TotalConsolidationCost;
