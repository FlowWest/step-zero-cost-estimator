import React, { useContext } from 'react';
import { Typography, Theme } from '@mui/material';
import { WaterSystemContext } from '../../../contexts/WaterSystem';
import { getConsolidationCostDetails } from '../../../util/consolidationUtil';
import BarChart from '../../uiComponents/BarChart';
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

  const { waterSystemDetails, consolidationCostParams } = state;
  const test = getConsolidationCostDetails({ waterSystemDetails, consolidationCostParams });
  return (
    <div className={styles.totalCostContainer}>
      <Typography variant="h5" paragraph>
        Total Consolidation Cost: $
        {test.total.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}
      </Typography>
      <Typography variant="h6" paragraph>
        Water Rate per Connection: $
        {(test.total / consolidationCostParams.connections / 12 / 10).toLocaleString('en-US', {
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
      <BarChart />
    </div>
  );
};

export default TotalConsolidationCost;
