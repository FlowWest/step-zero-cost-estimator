import React, { useState } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ConsolidationCalculator from './Consolidation/ConsolidationCalculator';
import CapitalImprovementCalculator from './CapitalImprovement/CapitalImprovementCalculator';

const CostComparisonWrapper = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Consolidation" value="1" />
            <Tab label="Capital Improvement" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <ConsolidationCalculator />
        </TabPanel>
        <TabPanel value="2">
          <CapitalImprovementCalculator />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default CostComparisonWrapper;
