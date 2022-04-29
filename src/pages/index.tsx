import React, { useContext } from 'react';
import { Button, Grid, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FC } from '../util';
import Autocomplete from '../components/uiComponents/Autocomplete';
import ContentWrapper from '../components/uiComponents/ContentWrapper';
import CostComparisonSummary from '../components/CostComparisonSummary/CostComparisonSummary';
import { WaterSystemContext } from '../contexts/WaterSystem';
import {
  updateWaterSystem,
  updateConsolidationCostParams,
  updateWaterSystemAndParams
} from '../contexts/WaterSystem/actions';
import { graphql } from 'gatsby';
import { WaterSystem } from '../util/interfaces';

const useStyles = makeStyles((theme: Theme) => ({
  buttonContainer: {
    alignSelf: 'center',
    margin: '0 1rem'
  },
  gridItemContainer: {
    margin: '1rem 0'
  }
}));

const IndexPage: FC = (props: any) => {
  const styles = useStyles();
  const [state, dispatch] = useContext(WaterSystemContext);

  const allWaterSystems = props.data.allWaterSystemDetailsCsv.nodes;
  const dropdownOptions = props.data.allWaterSystemDetailsCsv.nodes.map(
    (waterSystem: WaterSystem) => waterSystem.joinSystemName
  );

  const handleWaterSystemChange = (value: string) => {
    let newWaterSystem;
    const query = allWaterSystems.filter((obj: WaterSystem) => obj.joinSystemName == value);

    if (query.length !== 0) {
      newWaterSystem = query[0];
    } else if (query.length === 0) {
      newWaterSystem = {
        name: value,
        id: null
      };
    }

    const convertStrToNum = (string: string) =>
      parseInt(string.toString().substr(1).split(',').join(''));

    dispatch(
      updateWaterSystemAndParams(newWaterSystem, {
        connections: Number(newWaterSystem.joinConnection),
        pipelineCosts:
          convertStrToNum(newWaterSystem.joinPipelineCost) /
          Number(newWaterSystem.totalDistanceFeet),
        connectionCosts: convertStrToNum(newWaterSystem.connectionFee),
        adminLegalCosts: convertStrToNum(newWaterSystem.adminFee),
        distance: parseInt(newWaterSystem.totalDistanceFeet)
      })
    );
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Step Zero Calculator
        </Typography>
        <Typography paragraph>
          Paragraph describing step zero as a precursor to feasability study. Explain to the user
          what the consolidation and capital improvement caluclatros are used for, as well as how to
          use the below input fields, expecations, warnings, reminders, etc etc. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua.
        </Typography>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={8} md={5}>
          <Autocomplete
            dropdownLabel={'Water System'}
            dropdownPlaceholder={'Select or type in your water system'}
            dropdownOptions={dropdownOptions}
            selectedObject={state.currentWaterSystem}
            setSelectedObject={handleWaterSystemChange}
          />
        </Grid>
        {Object.keys(state.currentWaterSystem).length > 0 && (
          <Grid item xs={12} md={4} className={styles.buttonContainer}>
            <Button
              onClick={() => {
                dispatch({ type: 'update_water_system', payload: {} });
              }}
            >
              Select a new water system
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid container item xs={12} style={{ gap: '50px' }}>
        <Grid item xs={12} className={styles.gridItemContainer}>
          <ContentWrapper
            title={`Cost Comparison Summary ${
              state.currentWaterSystem?.name ? `for ${state.currentWaterSystem?.name}` : ''
            }`}
          >
            <CostComparisonSummary
              selectedWaterSystem={state.currentWaterSystem}
              consolidationCostParams={state.consolidationCostParams}
            />
          </ContentWrapper>
        </Grid>
        <Grid item xs={12} className={styles.gridItemContainer}>
          <ContentWrapper title="Calculation Methodology Explanation">
            <Typography paragraph>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit quis voluptates
              perspiciatis quas. Officiis, eligendi!
            </Typography>
            <Typography paragraph>
              Paragraph describing math behind the calculations, providing helpful information,
              answering FAQS etc? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in
            </Typography>
            <Typography paragraph>
              Paragraph describing math behind the calculations, providing helpful information,
              answering FAQS etc? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in
            </Typography>
            <Typography paragraph>
              Paragraph describing math behind the calculations, providing helpful information,
              answering FAQS etc? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in
            </Typography>
          </ContentWrapper>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default IndexPage;

//Original Water_Systems_Details moved to static/water_system_details.csv

export const query = graphql`
  query MyQuery {
    allWaterSystemDetailsCsv {
      nodes {
        connectionId: id
        totalDistanceFeet: TtlDistance_ft
        joinClassNew: J_Class_New
        joinConnection: J_Conn
        joinCounty: J_County
        joinElevation: Elevation_J
        joinPipelineCost: Pipeline_Cost
        joinSystemName: J_Sys_Name
        joinSystemPWSID: J_Sys_PWSID
        mergeType: MergeType
        receivingCounty: R_County
        receivingElevation: Elevation_R
        receivingSystemName: R_Sys_Name
        receivingSystemPWSID: R_Sys_PWSID
        receivingType: R_Type
        routeElevationMax: Route_Elev_Max
        routeElevationMean: Route_Elev_Mean
        routeElevationMin: Route_Elev_Min
        routeElevationRange: Route_Elev_Range
        routeName: Route_Name
        connectionFee: Conn_Fee
        adminFee: Admin_Legal_CEQA
      }
    }
  }
`;
