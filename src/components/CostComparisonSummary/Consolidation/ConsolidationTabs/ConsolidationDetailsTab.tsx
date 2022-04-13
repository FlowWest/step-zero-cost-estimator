import React, { useState } from 'react';
import { Typography, List, ListItemButton, ListItemText, Collapse, Theme } from '@mui/material';
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
  const { materialCosts, adminFees, financialAssistance, adjustments, total } = chartData;
  console.log(chartData);

  const [detailOpen1, setDetailOpen1] = useState(false);
  const [detailOpen2, setDetailOpen2] = useState(false);
  const [detailOpen3, setDetailOpen3] = useState(false);

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
            <ListItemButton sx={{ pl: 5 }}>
              <ListItemText
                className={classes.listSubItem}
                primary={`Pipeline Costs`}
                secondary={formatToUSD(materialCosts.totalPipelineCosts)}
              />
            </ListItemButton>
            <ListItemButton sx={{ pl: 5 }}>
              <ListItemText
                className={classes.listSubItem}
                primary={`Connection Costs`}
                secondary={formatToUSD(materialCosts.totalConnectionCosts)}
              />
            </ListItemButton>
            <ListItemButton sx={{ pl: 5 }}>
              <ListItemText
                className={classes.listSubItem}
                primary={`Service Fees`}
                secondary={formatToUSD(materialCosts.totalServiceFee)}
              />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Second List Item */}
        <ListItemButton divider onClick={() => setDetailOpen2(!detailOpen2)}>
          <ListItemText primary={`Administrative Fees:`} secondary={formatToUSD(adminFees.total)} />
          {detailOpen2 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={detailOpen2} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 5 }}>
              <ListItemText
                className={classes.listSubItem}
                primary={`Admin & Legal`}
                secondary={formatToUSD(adminFees.adminLegalCosts)}
              />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Third List Item */}
        <ListItemButton divider onClick={() => setDetailOpen3(!detailOpen3)}>
          <ListItemText primary={`Adjustments:`} secondary={formatToUSD(adjustments.total)} />
          {detailOpen3 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={detailOpen3} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 5 }}>
              <ListItemText
                className={classes.listSubItem}
                primary={`Contingency Costs`}
                secondary={formatToUSD(adjustments.totalContingency)}
              />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </>
  );
};

export default ConsolidationDetailsTab;
