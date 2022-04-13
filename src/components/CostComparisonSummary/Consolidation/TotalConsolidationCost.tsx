import React, { useContext, useEffect, useState } from 'react';
import { Typography, Theme, Grid } from '@mui/material';
import { WaterSystemContext } from '../../../contexts/WaterSystem';
import { getConsolidationCostDetails } from '../../../util/consolidationUtil';
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

  const { currentWaterSystem, consolidationCostParams } = state;
  const [consolidationCostDetails, setConsolidationCostDetailset] = useState({} as any);

  // const { waterSystemDetails, consolidationCostParams } = state;
  // const consolidationCostDetails = getConsolidationCostDetails({ waterSystemDetails, consolidationCostParams });
  useEffect(() => {
    console.log('consolidationCostParams', consolidationCostParams);
    setConsolidationCostDetailset(
      getConsolidationCostDetails({
        currentWaterSystem,
        consolidationCostParams
      })
    );
    console.log('Consolidation Cost Details', consolidationCostDetails);
  }, [state.consolidationCostParams]);

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
