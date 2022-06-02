import React, { useContext, useEffect, useState } from 'react';
import { Typography, Theme, Grid } from '@mui/material';
import { WaterSystemContext } from '../../../contexts/WaterSystem';
import { getConsolidationCostDetails } from '../../../util/consolidationUtil';
import { formatToUSD } from '../../../util/util';
import { makeStyles } from '@mui/styles';
import ConsolidationTabs from './ConsolidationTabs/ConsolidationTabs';

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

  const { currentWaterSystem, consolidationCostParams } = state || {};
  const [consolidationCostDetails, setConsolidationCostDetailset] = useState({} as any);

  useEffect(() => {
    setConsolidationCostDetailset(
      getConsolidationCostDetails({
        currentWaterSystem,
        consolidationCostParams
      })
    );
  }, [state?.consolidationCostParams]);

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
        <Typography paragraph sx={{ fontStyle: 'italic' }}>
          The information provided on this page is for a step zero analysis and is intended for
          exploratory purposes only. The calculations are not a replacement for a full feasibility
          analysis.{' '}
        </Typography>
      </Grid>
    </Grid>
    // </div>
  );
};

export default TotalConsolidationCost;
