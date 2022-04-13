import React, { useState } from 'react';
import { Typography, List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { ConsolidationCostDetails } from '../../../../util/interfaces';
import { makeStyles } from '@mui/material';

const ConsolidationDetailsTab = ({ chartData }: { chartData: ConsolidationCostDetails }) => {
  const { materialCosts, adminFees, financialAssistance, adjustments, total } = chartData;
  console.log(chartData);

  const [detailOpen1, setDetailOpen1] = useState(true);
  const [detailOpen2, setDetailOpen2] = useState(true);
  const [detailOpen3, setDetailOpen3] = useState(true);

  const handleClick = (event: React.SyntheticEvent) => {
    const eventTarget = event.target as HTMLElement;
    let text: string = eventTarget.innerText;
    console.log(text);
    if (text.includes('Material Costs')) setDetailOpen1(!detailOpen1);
    if (text.includes('Administrative Fees')) setDetailOpen2(!detailOpen2);
    if (text.includes('Adjustments')) setDetailOpen3(!detailOpen3);
  };

  return (
    <>
      <List
        sx={{ width: '100%', maxWidth: 600, bgcolor: '#fff' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {/* First List Item */}
        <ListItemButton divider onClick={handleClick}>
          <ListItemText primary={`Material Costs: ${materialCosts.total}`} />
          {detailOpen1 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={detailOpen1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 5 }}>
              <ListItemText primary={'Testing A1'} />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Second List Item */}
        <ListItemButton divider onClick={handleClick}>
          <ListItemText primary={`Administrative Fees: ${adminFees.total}`} />
          {detailOpen2 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={detailOpen2} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 5 }}>
              <ListItemText primary={'Testing B2'} />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Third List Item */}
        <ListItemButton divider onClick={handleClick}>
          <ListItemText primary={`Adjustments: ${adjustments.total}`} />
          {detailOpen3 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={detailOpen3} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 5 }}>
              <ListItemText primary={'Testing C3'} />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </>
  );
};

export default ConsolidationDetailsTab;
