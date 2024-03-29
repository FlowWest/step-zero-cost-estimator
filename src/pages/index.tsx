import React, { useContext, useState } from 'react';
import { Button, Grid, Theme, Typography, InputLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FC } from '../util';
import Autocomplete from '../components/uiComponents/Autocomplete';
import ContentWrapper from '../components/uiComponents/ContentWrapper';
import CostComparisonSummary from '../components/CostComparisonSummary/CostComparisonSummary';
import { WaterSystemContext } from '../contexts/WaterSystem';
import { updateWaterSystemAndParams } from '../contexts/WaterSystem/actions';
import { graphql } from 'gatsby';
import { WaterSystem } from '../util/interfaces';
import { Seo } from '../components';
import WaterSystemDetailsDialog from '../components/CostComparisonSummary/WaterSystemDetailsDialog';
import { MethodologyExplanation } from '../components/MethodologyExplanation/MethodologyExplanation';

const useStyles = makeStyles((theme: Theme) => ({
  buttonContainer: {
    alignSelf: 'center',
    margin: '0 1rem'
  },
  gridItemContainer: {
    margin: '1rem 0'
  },
  accordionContainer: {
    background: theme.palette.background.content
  },
  resetButton: {
    color: theme.palette.error.main
  }
}));

const IndexPage: FC = (props: any) => {
  const classes = useStyles();
  const [state, dispatch] = useContext(WaterSystemContext) as Array<any>;
  const [systemsDetailsDialogIsOpen, setSystemsDetailsDialogIsOpen] = useState(false as boolean);

  const allWaterSystems = props.data.allWaterSystemDetailsCsv.nodes;
  const dropdownOptions = props.data.allWaterSystemDetailsCsv.nodes
    .map(
      (waterSystem: WaterSystem) => `${waterSystem.joinSystemName} (${waterSystem.joinSystemPWSID})`
    )
    .sort((a: string, b: string) => (a > b ? 1 : -1));

  const handleWaterSystemChange = (value: string) => {
    let newWaterSystem;
    const query = allWaterSystems.filter(
      (obj: WaterSystem) =>
        value && `${obj.joinSystemName} (${obj.joinSystemPWSID})`.trim() === value.trim()
    );

    if (query.length !== 0) {
      newWaterSystem = query[0];
    } else if (query.length === 0) {
      newWaterSystem = {
        name: value,
        id: null
      };
    }

    const { connections, distance } = state?.consolidationCostParams || {};

    dispatch(
      updateWaterSystemAndParams(newWaterSystem, {
        connections: Number(newWaterSystem.joinConnections) || connections,
        distance: parseInt(newWaterSystem.distanceFt) || distance
      })
    );
  };

  const handleCloseSystemsDetailsDialog = () => {
    setSystemsDetailsDialogIsOpen(false);
  };

  const handleOpenSystemsDetailsDialog = () => {
    setSystemsDetailsDialogIsOpen(true);
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Seo title="Calculator" />
      <Grid item xs={12}>
        <Typography variant="h3" gutterBottom>
          Step Zero Calculator
        </Typography>
        <Typography paragraph>
          This tool is “step zero” for small water systems considering entering into a drinking
          water partnership through physical consolidation and is designed to help inform
          stakeholders of the feasibility and costs associated with consolidation compared to
          upgrading and maintaining their existing system. The estimates provided should be viewed
          as a precursor to a full feasibility study. Actual cost of both capital improvements and
          consolidation will vary by system based on site-specific details that are not accounted
          for in this tool. Optimal receiving water systems for physical consolidation and cost
          methodology were adapted from the Water Boards 2021 Drinking Water Cost Assessment & Gap
          Analysis and the 2022 Drinking Water Needs Assessment Drought Infrastructure Cost
          Assessment reports.
        </Typography>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight={'bold'}>
            Select Water System
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2">
            If your desired water system is not in the dropdown list, you may type in the name of
            it, and the application will use default values to begin the calculation.
          </Typography>
        </Grid>
        <Grid item xs={8} md={5}>
          <Autocomplete
            dropdownLabel={'Water System'}
            dropdownPlaceholder={'Select or type in your water system'}
            dropdownOptions={dropdownOptions}
            selectedObject={state?.currentWaterSystem}
            setSelectedObject={handleWaterSystemChange}
          />
        </Grid>
        {state && Object.keys(state?.currentWaterSystem).length > 0 && (
          <>
            <Grid item xs={12} md={4} className={classes.buttonContainer}>
              <Button
                color="error"
                onClick={() => {
                  dispatch({ type: 'reset_water_system', payload: {} });
                }}
              >
                Select a new water system
              </Button>
            </Grid>
            {state.currentWaterSystem?.joinSystemPWSID && (
              <Grid item xs={12} md={4}>
                <Button onClick={handleOpenSystemsDetailsDialog} variant="outlined">
                  View additional water systems information
                </Button>
              </Grid>
            )}

            <WaterSystemDetailsDialog
              state={state}
              systemsDetailsDialogIsOpen={systemsDetailsDialogIsOpen}
              handleCloseSystemsDetailsDialog={handleCloseSystemsDetailsDialog}
            />
          </>
        )}
      </Grid>
      <Grid container item xs={12} style={{ gap: '50px' }}>
        <Grid item xs={12} className={classes.gridItemContainer}>
          <ContentWrapper
            title={`Cost Comparison Summary ${
              state?.currentWaterSystem?.joinSystemName || state?.currentWaterSystem?.name
                ? `for ${
                    state?.currentWaterSystem?.joinSystemName || state?.currentWaterSystem?.name
                  }`
                : ''
            }`}
          >
            <CostComparisonSummary
              selectedWaterSystem={state?.currentWaterSystem}
              consolidationCostParams={state?.consolidationCostParams}
              cipCostData={state?.cipCostData}
            />
          </ContentWrapper>
        </Grid>
        <Grid item xs={12} className={classes.gridItemContainer}>
          <ContentWrapper title="Calculation Methodology Explanation">
            <MethodologyExplanation />
          </ContentWrapper>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default IndexPage;

export const query = graphql`
  query MyQuery {
    allWaterSystemDetailsCsv {
      nodes {
        distanceFt: distance_feet
        joinClassNew: j_class_new
        joinConnections: j_conn
        joinCounty: j_county
        joinElevation: elevation_j
        joinPopulation: j_pop
        joinSystemName: j_sys_name
        joinSystemPWSID: j_sys_pwsid
        mergeType: merge_type
        receivingCounty: r_county
        receivingElevation: elevation_r
        receivingSystemName: r_sys_name
        receivingSystemPassword: r_sys_pwsid
        receivingType: r_type
        routeElevationMax: route_elev_max
        routeElevationMean: route_elev_mean
        routeElevationMin: route_elev_min
        routeElevationRange: route_elev_range
        routeName: route_name
      }
    }
  }
`;
