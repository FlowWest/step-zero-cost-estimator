import React from 'react';
import { Theme, Typography, Grid, Link } from '@mui/material';
import { Link as GatsbyLink } from 'gatsby';
import { makeStyles } from '@mui/styles';
import CostComparisonWrapper from './CostComparisonWrapper';
import { WaterSystem } from '../../util/interfaces';
import { formatToUSD } from '../../util/util';
import { getConsolidationCostDetails } from '../../util/costUtil';

const useStyles = makeStyles((theme: Theme) => ({
  totalCostLabel: {
    fontWeight: 600
  },
  tableWrapper: {
    textAlign: 'center',
    color: theme.palette.common.white,
    margin: '0 auto 10px'
  },
  tableCell: { paddingBlock: 5 },
  tableCellLarge: { paddingBlock: 5, fontSize: 18 },
  comparisonHeader: {
    backgroundColor: theme.palette.primary.dark,
    fontSize: 20
  },
  leftColumn: { backgroundColor: theme.palette.secondary.dark },
  middleColumn: { backgroundColor: theme.palette.common.white, color: theme.palette.common.black },
  rightColumn: { backgroundColor: theme.palette.primary.main }
}));

const CostComparisonSummary = ({
  selectedWaterSystem,
  consolidationCostParams,
  cipCostData
}: {
  selectedWaterSystem: WaterSystem;
  consolidationCostParams: any;
  cipCostData: any;
}): JSX.Element => {
  const classes = useStyles();

  // Variable that holds calculated total cost of consolidation
  const consolidationCostDetails = getConsolidationCostDetails({
    waterSystemDetails: selectedWaterSystem,
    consolidationCostParams: consolidationCostParams
  });

  const renderColumn = (arr: any[], className: string) => {
    return (
      <Grid item container direction={'row'} xs={4} style={{ gap: 3 }}>
        {arr.map((item, idx) => (
          <Grid
            key={idx}
            item
            xs={12}
            className={
              idx === 0
                ? `${classes.tableCellLarge} ${className}`
                : `${classes.tableCell} ${className}`
            }
          >
            {item}
          </Grid>
        ))}
      </Grid>
    );
  };
  const formatArray = (arr: any[]) =>
    arr.map((value) => (typeof value === 'number' ? formatToUSD(value) : value));

  const consolidationCostsArray = [
    consolidationCostDetails ? consolidationCostDetails.total : 0,
    consolidationCostDetails ? consolidationCostDetails.totalCostPerConnection : 0,
    'Determined by Receiving System',
    'Determined by Receiving System'
  ];

  let cipTotal = 0;

  if (cipCostData?.total) {
    cipTotal += cipCostData?.total;
  }
  if (cipCostData?.treatmentCapital) {
    cipTotal += cipCostData?.treatmentCapital;
  }
  const cipCostsArray = [
    cipTotal,
    cipTotal / consolidationCostParams?.connections,
    cipCostData?.treatmentOperational ? cipCostData?.treatmentOperational : 0,
    cipCostData?.treatmentOperational
      ? cipCostData?.treatmentOperational / consolidationCostParams.connections
      : 0
  ];
  const categoriesArray = [
    'Total',
    'Cost per Connection',
    'Annual O&M Costs',
    'Annual O&M Costs per Connection'
  ];

  return (
    <>
      {selectedWaterSystem && Object.keys(selectedWaterSystem).length ? (
        <>
          <Grid container>
            <Grid item xs={12}>
              <Typography paragraph align="center">
                Provide the required information in both the Consolidation and Capital Improvement
                Plan calculators to view your cost comparison.
              </Typography>
            </Grid>
            <Grid container rowSpacing={0.5} item xs={12} md={12} className={classes.tableWrapper}>
              <Grid
                item
                xs={12}
                container
                className={`${classes.comparisonHeader} ${classes.tableCell}`}
              >
                <Grid xs={4}>Consolidation</Grid>
                <Grid xs={4}>vs</Grid>
                <Grid xs={4}>Capital Improvement</Grid>
              </Grid>
              {renderColumn(formatArray(consolidationCostsArray), classes.leftColumn)}
              {renderColumn(categoriesArray, classes.middleColumn)}
              {renderColumn(formatArray(cipCostsArray), classes.rightColumn)}
            </Grid>
            <Typography paragraph fontWeight="bold">
              Water rates may be affected by costs associated with Capital Improvement, as well as
              undertaking Consolidation projects.
            </Typography>
            <Typography paragraph fontWeight="bold">
              You may visit the{' '}
              <Link to="/resources" component={GatsbyLink}>
                Resources Page
              </Link>{' '}
              of this application to view additional tools that assist in estimating and examining
              changes in water rates based on a variety of factors.
            </Typography>
            <Typography paragraph fontWeight="bold">
              The cost estimates calculated and resources linked in this application are meant for a
              step zero analysis and are intended for exploratory purposes only. The calculations
              are not a replacement for a full feasibility analysis.
            </Typography>
          </Grid>
          <CostComparisonWrapper />
        </>
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
