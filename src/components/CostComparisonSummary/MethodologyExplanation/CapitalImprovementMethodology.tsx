import React from 'react';
import {
  Typography,
  Theme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
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

const CapitalImprovementMethodology = () => {
  const classes = useStyles();
  return (
    <div>
      <Typography className={classes.sectionHeader} variant="h5">
        Capital Improvement
      </Typography>
      <Typography paragraph>
        The methodology for calculating capital improvement costs builds upon a Small Water System
        Budget Calculator tool developed by the Water Board.
      </Typography>
      <Typography className={classes.subSectionHeader} variant="h6">
        System Components Data
      </Typography>
      <Typography paragraph>
        The application has prepopulated a list of common water system components to allow for
        quicker data entry. The costs and lifespans associated with each water system component is a
        high level estimate.
      </Typography>
    </div>
  );
};

export default CapitalImprovementMethodology;
