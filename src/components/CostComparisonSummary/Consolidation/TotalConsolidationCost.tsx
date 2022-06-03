import React, { useContext, useEffect, useState } from 'react';
import { Typography, Theme, Grid } from '@mui/material';
import { WaterSystemContext } from '../../../contexts/WaterSystem';
import { getConsolidationCostDetails } from '../../../util/consolidationUtil';
import { formatToUSD } from '../../../util/util';
import { makeStyles } from '@mui/styles';
import ConsolidationTabs from './ConsolidationTabs/ConsolidationTabs';
import WarningMessage from '../../uiComponents/WarningMessage';

const useStyles = makeStyles((theme: Theme) => ({
  componentsContainer: {
    height: '100%',
    textAlign: 'center',
    paddingLeft: '1rem'
  },
  gridItem: {
    width: '100%'
  }
}));

const TotalConsolidationCost = () => {
  const styles = useStyles();
  const [state, dispatch] = useContext(WaterSystemContext);

  const { currentWaterSystem, consolidationCostParams } = state;
  const [consolidationCostDetails, setConsolidationCostDetailset] = useState({} as any);

  useEffect(() => {
    setConsolidationCostDetailset(
      getConsolidationCostDetails({
        waterSystemDetails: currentWaterSystem,
        consolidationCostParams
      })
    );
  }, [state.consolidationCostParams, currentWaterSystem]);

  return (
    <Grid
      className={styles.componentsContainer}
      container
      direction="column"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item className={styles.gridItem}>
        <Typography variant="h5" paragraph>
          Total Consolidation Cost: {formatToUSD(consolidationCostDetails.total)}
        </Typography>
        <Typography variant="h6" paragraph>
          Total Cost per Connection: {formatToUSD(consolidationCostDetails.totalCostPerConnection)}
        </Typography>
        <ConsolidationTabs chartData={consolidationCostDetails} />
      </Grid>
      <Grid item className={styles.gridItem}>
        <WarningMessage />
      </Grid>
    </Grid>
  );
};

export default TotalConsolidationCost;
