import React, { useState } from 'react';
import { Typography, Grid, Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import WaterSystemDetailsCIP from './WaterSystemDetailsCIP';
import SystemComponentsTab from './SystemComponents/SystemComponentsTab';
import TreatmentsTab from './Treatments/TreatmentsTab';

function CapitalImprovementCalculator(props: any) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('systemComponents' as string);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" style={{ fontWeight: 600 }}>
          Capital Improvement Calculator
        </Typography>
      </Grid>
      <WaterSystemDetailsCIP />
      <Grid item xs={12}>
        <Typography variant="subtitle1">
          Within this section, you may add costs required to stay an independent water system, such
          as current system component capital improvement costs, expected future component capital
          improvement costs, and treatment capital and operational costs.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="System Components" value="systemComponents" />
              <Tab label="Treatments" value="treatments" />
            </TabList>
          </Box>
          <TabPanel value="systemComponents">
            <SystemComponentsTab />
          </TabPanel>
          <TabPanel value="treatments">
            <TreatmentsTab />
          </TabPanel>
        </TabContext>
      </Grid>
    </Grid>
  );
}

export default CapitalImprovementCalculator;
