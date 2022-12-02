import React from 'react';
import {
  Typography,
  Theme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  sectionHeader: {
    fontWeight: 'bold',
    marginBottom: '1rem'
  },
  subSectionHeader: {
    marginBottom: '0.5rem',
    fontWeight: 'bold'
  },
  tableColumnHeader: {
    fontWeight: 'bold'
  }
}));

const systemCalculations = [
  {
    name: 'Sounder',
    formula: `Sounder Base Cost + Regional Adjustment + Inflation Adjustment`
  },
  {
    name: 'Generator',
    formula: `Generator Base Cost + ($341 * MDD Flow Rate) + Regional Adjustment + Air Polution Permitting Fees Adjustment + Inflation Adjustment`
  },
  {
    name: 'Well Development Cost',
    formula: `($145.01 * MDD Flow Rate) + $32,268`
  },
  {
    name: 'Well Pump and Motor Cost',
    formula: `($136.73 * MDD Flow Rate) + $116,448`
  },
  {
    name: 'New Well',
    formula: `Well Drilling Cost + CEQA + SCADA + Well Development Cost+ Well Pump and
Motor Cost + Total Cost Planning and Construction Adjustment + Regional Adjustment + Inflation Adjustment`
  },
  {
    name: 'Meters (all connections)',
    formula: `(Meter Base Cost * Number of Connections) + Meter Software Cost + Regional Adjustment + Inflation Adjustment`
  }
];

const CapitalImprovementMethodology = () => {
  const classes = useStyles();
  return (
    <div>
      <Typography className={classes.sectionHeader} variant="h5">
        Capital Improvement Methodology
      </Typography>
      <Typography paragraph>
        The methodology for calculating capital improvement costs builds upon a Small Water System
        Budget Projection/Capital Improvement Plan tool developed by the Water Board.
      </Typography>
      <Typography className={classes.subSectionHeader} variant="h6">
        Average and Maximum Daily Demand
      </Typography>
      <Typography paragraph>
        Within the Capital Improvement section, costs for certain water system components and
        treatment are dependent on the consumption amount of the water system. The application
        utilizes different consumption amounts, based on the formulas for various items: Average
        Daily Demand (ADD), Maximum Daily Demand (MDD), and Flow Rate in gpm. The formulas for
        calculating them are as follows:
      </Typography>
      <Typography paragraph>
        <Typography component="span" fontWeight="bold">
          Average Daily Demand
        </Typography>
        : Served Population * 150 gallons
      </Typography>
      <Typography paragraph>
        <Typography component="span" fontWeight="bold">
          Maximum Daily Demand
        </Typography>
        : ADD * 2.25 peaking factor
      </Typography>
      <Typography paragraph>
        <Typography component="span" fontWeight="bold">
          Maximum Daily Demand Flow Rate (gpm)
        </Typography>
        : MDD / 1440 minutes
      </Typography>
      <Typography className={classes.subSectionHeader} variant="h6">
        System Components Data
      </Typography>
      <Typography paragraph>
        The application has prepopulated a list of common water system components to allow for
        quicker data entry. The costs and lifespans associated with each water system component are
        high level estimates, and were determined from a variety of sources, including both the{' '}
        <Link
          href="https://www.waterboards.ca.gov/drinking_water/certlic/drinkingwater/documents/needs/2021_needs_assessment.pdf"
          target="_blank"
        >
          2021
        </Link>{' '}
        and{' '}
        <Link
          href="https://www.waterboards.ca.gov/drinking_water/certlic/drinkingwater/documents/needs/2022needsassessment.pdf"
          target="_blank"
        >
          2022
        </Link>{' '}
        Drinking Water Needs Assessment, and user research discussions, the{' '}
        <Link
          href="https://www.waterboards.ca.gov/drinking_water/certlic/drinkingwater/documents/tmfplanningandreports/Typical_life.pdf"
          target="_blank"
        >
          Typical Equipment Life Expectancy
        </Link>{' '}
        table, and the Small Water System Budget Projection/Capital Improvement Plan tool.
      </Typography>
      <Typography paragraph>
        The cost estimate for certain components were calculated using formulas derived from the{' '}
        <Link
          href="https://www.waterboards.ca.gov/drinking_water/certlic/drinkingwater/documents/needs/2022needsassessment.pdf"
          target="_blank"
        >
          2022 Drinking Water Needs Assessment
        </Link>
        , which are detailed below. Cost variables from the above section are referenced.
      </Typography>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableColumnHeader}>Component Name</TableCell>
              <TableCell className={classes.tableColumnHeader}>Formula</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {systemCalculations.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.formula}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CapitalImprovementMethodology;
