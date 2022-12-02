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

const costVariables = [
  { name: 'Connection Fee Per Connection', value: '$6,600', adjustable: true },
  { name: 'Distance Buffer', value: '1,000 ft', adjustable: false },
  { name: 'Pipe Cost Per Foot', value: '$155', adjustable: true },
  { name: 'Service Line Fee', value: '$5,000', adjustable: false },
  { name: 'Admin and Legal', value: '$200,000', adjustable: true },
  { name: 'CEQA', value: '$85,000', adjustable: false },
  { name: 'SCADA', value: '$100,000', adjustable: false },
  { name: 'Lot Cost for Booster Stations (100x100ft lot)', value: '$150,000', adjustable: false },
  { name: 'Booster Station', value: '$75,000', adjustable: false },
  { name: 'Sounder Base Cost', value: '$1,700', adjustable: false },
  { name: 'Generator Base Cost', value: '$30,134', adjustable: false },
  { name: 'Well Drilling Cost', value: '$1,200,000', adjustable: false },
  { name: 'Meter Base Cost', value: '$1,200', adjustable: false },
  { name: 'Meter Software Cost', value: '$29,000', adjustable: false },
  { name: 'Contingency Adjustment Percentage', value: '20%', adjustable: true },
  { name: 'Urban Adjustment Percentage', value: '32%', adjustable: false },
  { name: 'Suburban Adjustment Percentage', value: '30%', adjustable: false },
  { name: 'Rural Adjustment Percentage', value: '0%', adjustable: false },
  { name: 'Planning and Construction Adjustment Percentage', value: '25%', adjustable: false },
  { name: 'Inflation Adjustment Percentage', value: '4.7%', adjustable: false },
  { name: 'Air Polution Permitting Fees Adjustment Percentage', value: '5%', adjustable: false }
];

const systemCalculations = [
  {
    name: 'Number of Connections',
    description:
      'The value based on joining system connections, used to calculate connection costs.',
    formula: `Number of Connections is an adjustable input field where the user can set the value. The input field is prepopulated and set to the number of connections for the selected joining system. If that value is unavailable, it is set to 8.`
  },
  {
    name: 'Total Connection Cost',
    description:
      'The total connection cost based on number of connections and connection fee per connection.',
    formula:
      'Product of the value within the "Number of Connections" input field multiplied by the value within the "Connection Fees" input field.'
  },
  {
    name: 'Total Distance',
    description: 'The distance between joining and receiving systems, plus buffer.',
    formula: 'Route Distance plus Distance Buffer.'
  },
  {
    name: 'Total Pipeline Cost',
    description: 'The total cost of pipes, based on Total Distance and Pipeline Costs.',
    formula:
      'Total Distance multiplied by the value within the "Pipeline Costs" input field. The "Pipeline Costs" input field is prepopulated and set to the value of the "Pipe Cost Per Foot" cost variable.'
  },
  {
    name: 'Total Service Line Cost',
    description:
      'The service line cost for systems already within service area of another system (intersecting systems).',
    formula:
      'If the Route Merge Type is "Intersect", Total Service Line Cost is equal to the Service Line Fee	cost variable value.'
  },
  {
    name: 'Total Material Costs',
    description:
      'Sum of all the material costs accounted for in connection costs, pipeline costs, and service line costs',
    formula: 'Total Connection Cost plus Total Pipeline Cost plus Total Service Line Cost'
  },
  {
    name: 'Elevation Adjustment',
    description:
      'The adjustment that accounts for the cost of land and 2 booster stations if elevation change results in pressure loss of over 10psi. Pressure loss is calculated using assumption that for every 1 foot of elevation gain, pressure drops 0.433 psi.',
    formula:
      'If the difference in Receiving System Elevation minus Joining System Elevation times 0.433 is greater than 10, the Elevation Adjustment will be the Booster Station cost variable value times 2 plus the cost variable value for the Lot Cost for Booster Stations. Else, Elevation Adjustment is 0.'
  },
  {
    name: 'Subtotal',
    description:
      'Sum of Total Material Costs, Elevation Adjustment if applicable, and "Admin, Legal, & CEQA Costs"',
    formula:
      'Total Material Costs + Elevation Adjustment + value within the "Admin, Legal, & CEQA Costs" input field.'
  },
  {
    name: 'Contingency Cost',
    description:
      'The adjustment amount to help account for costs not explicitly included in any calculations.',
    formula:
      'Product of Subtotal multiplied by the percentage value within the "Contingency" input field.'
  },
  {
    name: 'Planning and Construction Adjustment Cost',
    description:
      'The adjustment amount to help account for additional costs associated with planning and construction of a consolidation project not explicility not explicitly included in any other calculations.',
    formula:
      'Product of Subtotal multiplied by the percentage value of the Planning and Construction Adjustment Percentage cost variable.'
  },
  {
    name: 'Total Merger Cost',
    description: 'Total cost of factors directly related to material, planning, construction',
    formula:
      'Sum of "Subtotal" plus "Contingency Cost" plus "Planning and Construction Adjustment Cost".'
  },
  {
    name: 'Regional Adjustment Costs',
    description:
      'The adjustment amount to help account for differences in costs between urban, suburban, and rural communities. The regional adjustment is based on the county of the Joining System, a list of urban, suburban, and rural counties from the 2021 Drinking Water Needs Assessment, and the regional adjustment multipliers of the three settings.',
    formula:
      'If the joining system county is in the list of Urban counties, the regional adjustment multiplier is set to the Urban Adjustment Percentage. If the joining system county is in the list of Suburban counties, the regional adjustment multiplier is set to the Suburban Adjustment Percentage. If the joining system county is in the list of Rural Counties, or is not in any list, the adjustment multiplier is set to 1, to account for no adjustment. The Regional Adjustment Costs is then calculated by finding the product of "Total Merger Cost" times "Regional Adjustment Percentage".'
  },
  {
    name: 'Inflation Adjustment Costs',
    description: 'The adjustment amount to help account for inflation costs.',
    formula:
      'The product of (Total Merger Cost plus Regional Adjustment Costs) times Inflation Adjustment Percentage.'
  },
  {
    name: 'Total Consolidation Cost',
    description: 'The adjustment amount to help account for inflation costs.',
    formula:
      'The sum of Total Merge Cost plus Regional Adjustment Costs plus Inflation Adjustment Costs.'
  }
];

const ConsolidationMethodology = () => {
  const classes = useStyles();
  return (
    <div>
      <Typography className={classes.sectionHeader} variant="h5">
        Consolidation Methodology
      </Typography>
      <Typography paragraph>
        The methodology for calculating consolidation cost estimates builds upon work and data from
        the California State Water Resources Control Board for their annual Drinking Water Needs
        Assessment report, as well as Corona Environmental Consulting, from their{' '}
        <Link href="https://waterfdn.org/wp-content/uploads/2019/08/COSTAN1.pdf" target="_blank">
          Cost Analysis of California Drinking Water System Mergers
        </Link>{' '}
        study, which was completed for the Water Foundation.
      </Typography>
      <Typography className={classes.subSectionHeader} variant="h6">
        Water System Data
      </Typography>
      <Typography paragraph>
        The water system attributes used in calculation formulas by the application include:
        <ul>
          <li>Join System: Population, Number of Connections, County, Elevation</li>
          <li>Receiving System: Elevation</li>
          <li>Connection Details: Route Distance, Merge Type</li>
        </ul>
        These cost variable values for the selected water system were sourced from the Cost Analysis
        study.
      </Typography>
      <Typography className={classes.subSectionHeader} variant="h6">
        Cost Variables
      </Typography>
      <Typography paragraph>
        Within the application, there are cost variables that are used to help calculate costs.
        While some are adjustable within the application, like the input fields above, others are
        set by the application.
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableColumnHeader}>Variable Name</TableCell>
                <TableCell className={classes.tableColumnHeader}>Value</TableCell>
                <TableCell className={classes.tableColumnHeader}>Adjustable</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {costVariables.map((row) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.value}</TableCell>
                  <TableCell>{row.adjustable ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        These cost variable values were sourced from the Cost Analysis study and both the{' '}
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
        Drinking Water Needs Assessment
      </Typography>
      <Typography className={classes.subSectionHeader} variant="h6">
        Formulas
      </Typography>
      <Typography paragraph>
        Based off of water system attributes, user defined inputs, and set values, the application
        uses a multitude of formulas to calculate intermediate subtotals, and then the total
        consolidation cost estimate.
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableColumnHeader}>Variable Name</TableCell>
                <TableCell className={classes.tableColumnHeader}>Variable Description</TableCell>
                <TableCell className={classes.tableColumnHeader}>Logic Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {systemCalculations.map((row) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.formula}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        These cost variable values were derived from the Cost Analysis study, both the These cost
        variable values were sourced from the Cost Analysis study and both the{' '}
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
        Drinking Water Needs Assessment, and user research discussions.
      </Typography>
    </div>
  );
};

export default ConsolidationMethodology;
