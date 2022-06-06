import React, { useState } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Theme
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { ConsolidationCostDetails } from '../../../../util/interfaces';
import { formatToUSD } from '../../../../util/util';

const useStyles = makeStyles((theme: Theme) => ({
  listSubItem: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

const ConsolidationDetailsTab = ({ chartData }: { chartData: ConsolidationCostDetails }) => {
  const { materialCosts, adminFees, adjustments, total } = chartData || {};

  const [detailOpen1, setDetailOpen1] = useState(true);
  const [detailOpen2, setDetailOpen2] = useState(true);
  const [detailOpen3, setDetailOpen3] = useState(true);

  const classes = useStyles();

  return (
    <>
      <List
        sx={{ width: '100%', maxWidth: 600, bgcolor: '#fff' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {/* First List Item */}
        <ListItemButton divider onClick={() => setDetailOpen1(!detailOpen1)}>
          <ListItemText primary={`Material Costs:`} secondary={formatToUSD(materialCosts.total)} />
          {detailOpen1 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={detailOpen1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem sx={{ pl: 5 }}>
              <ListItemText
                className={classes.listSubItem}
                primary={`Pipeline Costs`}
                secondary={formatToUSD(materialCosts.totalPipelineCosts)}
              />
            </ListItem>
            <ListItem sx={{ pl: 5 }}>
              <ListItemText
                className={classes.listSubItem}
                primary={`Connection Costs`}
                secondary={formatToUSD(materialCosts.totalConnectionCosts)}
              />
            </ListItem>
            <ListItem sx={{ pl: 5 }}>
              <ListItemText
                className={classes.listSubItem}
                primary={`Service Fees`}
                secondary={formatToUSD(materialCosts.totalServiceFee)}
              />
            </ListItem>
          </List>
        </Collapse>

        {/* Second List Item */}
        <ListItemButton divider onClick={() => setDetailOpen2(!detailOpen2)}>
          <ListItemText primary={`Administrative Fees:`} secondary={formatToUSD(adminFees.total)} />
          {detailOpen2 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={detailOpen2} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem sx={{ pl: 5 }}>
              <ListItemText
                className={classes.listSubItem}
                primary={`Admin, Legal, & CEQA`}
                secondary={formatToUSD(adminFees.adminLegalCEQACosts)}
              />
            </ListItem>
          </List>
        </Collapse>

        {/* Third List Item */}
        <ListItemButton divider onClick={() => setDetailOpen3(!detailOpen3)}>
          <ListItemText primary={`Adjustments:`} secondary={formatToUSD(adjustments.total)} />
          {detailOpen3 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={detailOpen3} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem sx={{ pl: 5 }}>
              <ListItemText
                className={classes.listSubItem}
                primary={`Contingency Costs`}
                secondary={formatToUSD(adjustments.totalContingencyCost)}
              />
            </ListItem>
            <ListItem sx={{ pl: 5 }}>
              <ListItemText
                className={classes.listSubItem}
                primary={`Planning and Construction Costs`}
                secondary={formatToUSD(adjustments.planningAndConstructionAdjustmentCost)}
              />
            </ListItem>
            <ListItem sx={{ pl: 5 }}>
              <ListItemText
                className={classes.listSubItem}
                primary={`Elevation Adjustment Costs`}
                secondary={formatToUSD(adjustments.elevationAdjustmentCost)}
              />
            </ListItem>
            <ListItem sx={{ pl: 5 }}>
              <ListItemText
                className={classes.listSubItem}
                primary={`Regional Adjustment Costs`}
                secondary={formatToUSD(adjustments.regionalAdjustmentCost)}
              />
            </ListItem>
            <ListItem sx={{ pl: 5 }}>
              <ListItemText
                className={classes.listSubItem}
                primary={`Inflation Adjustment Costs`}
                secondary={formatToUSD(adjustments.inflationAdjustmentCost)}
              />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </>
  );
};

export default ConsolidationDetailsTab;
